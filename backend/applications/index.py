"""Приём заявок на вступление в СХО и сохранение в БД + уведомление в VK"""
import json
import os
import psycopg2
import urllib.request
import urllib.parse

SCHEMA = os.environ.get("MAIN_DB_SCHEMA", "t_p7762886_student_surgery_soci")
VK_PEER_ID = -226965793  # ID чата/беседы из ссылки приглашения (будет обновлено)


def send_vk_notify(name: str, year: str, phone: str, email: str, direction: str, motivation: str):
    token = os.environ.get("VK_BOT_TOKEN", "")
    if not token:
        return
    text = (
        f"📋 Новая заявка в СХО!\n"
        f"👤 {name}, {year}\n"
        f"📱 {phone}\n"
        f"📧 {email}\n"
        f"🔬 Направление: {direction or 'не указано'}\n"
        f"💬 {motivation or '—'}"
    )
    params = urllib.parse.urlencode({
        "peer_id": VK_PEER_ID,
        "message": text,
        "random_id": 0,
        "access_token": token,
        "v": "5.131",
    })
    url = f"https://api.vk.com/method/messages.send?{params}"
    try:
        urllib.request.urlopen(url, timeout=5)
    except Exception:
        pass


def handler(event: dict, context) -> dict:
    cors = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors, "body": ""}

    method = event.get("httpMethod", "GET")

    if method == "POST":
        body = json.loads(event.get("body") or "{}")
        name = body.get("name", "").strip()
        year = body.get("year", "").strip()
        phone = body.get("phone", "").strip()
        email = body.get("email", "").strip()
        direction = body.get("direction", "").strip()
        motivation = body.get("motivation", "").strip()

        if not name or not year or not phone or not email:
            return {"statusCode": 400, "headers": cors, "body": json.dumps({"error": "Заполните обязательные поля"})}

        conn = psycopg2.connect(os.environ["DATABASE_URL"])
        cur = conn.cursor()
        cur.execute(
            f"INSERT INTO {SCHEMA}.applications (name, year, phone, email, direction, motivation) "
            f"VALUES (%s, %s, %s, %s, %s, %s) RETURNING id",
            (name, year, phone, email, direction, motivation),
        )
        app_id = cur.fetchone()[0]
        conn.commit()
        cur.close()
        conn.close()

        send_vk_notify(name, year, phone, email, direction, motivation)

        return {"statusCode": 200, "headers": cors, "body": json.dumps({"ok": True, "id": app_id})}

    if method == "GET":
        admin_key = event.get("queryStringParameters", {}) or {}
        if admin_key.get("admin") != os.environ.get("ADMIN_KEY", "sho_admin_2025"):
            return {"statusCode": 403, "headers": cors, "body": json.dumps({"error": "Forbidden"})}

        conn = psycopg2.connect(os.environ["DATABASE_URL"])
        cur = conn.cursor()
        cur.execute(
            f"SELECT id, name, year, phone, email, direction, motivation, status, created_at "
            f"FROM {SCHEMA}.applications ORDER BY created_at DESC"
        )
        rows = cur.fetchall()
        cur.close()
        conn.close()

        apps = [
            {
                "id": r[0], "name": r[1], "year": r[2], "phone": r[3],
                "email": r[4], "direction": r[5], "motivation": r[6],
                "status": r[7], "created_at": str(r[8]),
            }
            for r in rows
        ]
        return {"statusCode": 200, "headers": cors, "body": json.dumps({"applications": apps})}

    return {"statusCode": 405, "headers": cors, "body": json.dumps({"error": "Method not allowed"})}
