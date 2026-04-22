import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const HERO_IMG = "https://cdn.poehali.dev/projects/b346d1c6-edca-404c-bc23-613d9f5d598c/files/fd1b90a6-bc67-49e0-b308-b1da70255411.jpg";
const OLYMPIAD_IMG = "https://cdn.poehali.dev/projects/b346d1c6-edca-404c-bc23-613d9f5d598c/files/61f3011b-25f6-4442-8976-38d50b9562ab.jpg";
const DOCTOR_IMG = "https://cdn.poehali.dev/projects/b346d1c6-edca-404c-bc23-613d9f5d598c/files/3aac0457-4960-47ff-a0b6-61d0d584a04c.jpg";

const API_URL = "https://functions.poehali.dev/ff0bb22c-0f31-4253-85d6-e0955fd74ffc";

type Tab = "home" | "directions" | "history" | "contacts" | "admin";
type Direction = "ssh" | "thoracic" | "abdominal" | "endovideo" | "plastic" | "trauma" | "gynecology" | "neuro" | "urology" | "air";

const directions = [
  {
    id: "ssh" as Direction,
    name: "ССХ",
    icon: "Heart",
    color: "#b91c1c",
    description: "Сердечно-сосудистая хирургия — направление, занимающееся операциями на сердце и магистральных сосудах. Студенты осваивают основы кардиохирургии, работу с аппаратом искусственного кровообращения, навыки сосудистого шва.",
    operations: ["АКШ", "Протезирование клапанов", "Коронарография", "Операции на аорте", "Имплантация ЭКС"],
    literature: [
      { title: "Сердечно-сосудистая хирургия", author: "Бураковский В.И.", year: 2019 },
      { title: "Кардиохирургия", author: "Шевченко Ю.Л.", year: 2020 },
    ],
    curator: { name: "Иванов Сергей Петрович", degree: "к.м.н., доцент", contact: "+7 (391) 221-24-49", vk: "https://vk.com", tg: "https://t.me" },
    prevCurators: ["Смирнов А.В. (2019–2022)"],
  },
  {
    id: "thoracic" as Direction,
    name: "Торакальная хирургия",
    icon: "Wind",
    color: "#991b1b",
    description: "Направление специализируется на операциях органов грудной клетки: лёгкие, плевра, трахея, пищевод, средостение. Особый акцент на торакоскопических технологиях.",
    operations: ["Лобэктомия", "Пневмонэктомия", "Торакоскопия", "Операции на пищеводе", "Декортикация лёгкого"],
    literature: [
      { title: "Торакальная хирургия", author: "Бисенков Л.Н.", year: 2004 },
      { title: "Хирургия лёгких и плевры", author: "Колесников И.С.", year: 2018 },
    ],
    curator: { name: "Кожевникова Мария Андреевна", degree: "д.м.н., профессор", contact: "+7 (391) 221-24-50", vk: "https://vk.com", tg: "https://t.me" },
    prevCurators: ["Николаев В.В. (2017–2020)"],
  },
  {
    id: "abdominal" as Direction,
    name: "Абдоминальная хирургия",
    icon: "Stethoscope",
    color: "#a61c1c",
    description: "Хирургия органов брюшной полости: желудок, кишечник, печень, поджелудочная железа, желчный пузырь. Студенты отрабатывают навыки лапароскопических и открытых операций.",
    operations: ["Аппендэктомия", "Холецистэктомия", "Резекция желудка", "Лапароскопия", "Герниопластика"],
    literature: [
      { title: "Хирургические болезни", author: "Кузин М.И.", year: 2022 },
      { title: "Абдоминальная хирургия", author: "Савельев В.С.", year: 2019 },
    ],
    curator: { name: "Дроздов Алексей Игоревич", degree: "к.м.н., ассистент", contact: "+7 (391) 221-24-51", vk: "https://vk.com", tg: "https://t.me" },
    prevCurators: ["Петров К.Д. (2016–2019)"],
  },
  {
    id: "endovideo" as Direction,
    name: "Эндовидеохирургия",
    icon: "Video",
    color: "#7f1d1d",
    description: "Направление охватывает все аспекты минимально инвазивной хирургии с использованием видеосистем: лапароскопия, торакоскопия, роботические технологии. Студенты тренируются на симуляторах и тренажёрах.",
    operations: ["Лапароскопия", "Торакоскопия", "Роботическая хирургия", "Гистероскопия", "Артроскопия"],
    literature: [
      { title: "Лапароскопическая хирургия", author: "Федоров И.В.", year: 2020 },
      { title: "Эндовидеохирургия", author: "Емельянов С.И.", year: 2018 },
    ],
    curator: { name: "Громов Виктор Николаевич", degree: "к.м.н., доцент", contact: "+7 (391) 221-24-53", vk: "https://vk.com", tg: "https://t.me" },
    prevCurators: ["Сидоров И.Л. (2018–2021)"],
  },
  {
    id: "plastic" as Direction,
    name: "Пластическая хирургия",
    icon: "Sparkles",
    color: "#c0392b",
    description: "Реконструктивная и эстетическая хирургия. Направление изучает принципы пересадки тканей, кожно-пластических операций, работу с микрохирургической техникой.",
    operations: ["Кожная пластика", "Ринопластика", "Маммопластика", "Липосакция", "Реконструктивные операции"],
    literature: [
      { title: "Пластическая хирургия", author: "Белоусов А.Е.", year: 2021 },
      { title: "Реконструктивная микрохирургия", author: "Миланов Н.О.", year: 2017 },
    ],
    curator: { name: "Волкова Наталья Сергеевна", degree: "д.м.н., профессор", contact: "+7 (391) 221-24-52", vk: "https://vk.com", tg: "https://t.me" },
    prevCurators: ["Зайцев П.К. (2019–2022)"],
  },
  {
    id: "trauma" as Direction,
    name: "Травматология и ортопедия",
    icon: "Bone",
    color: "#b91c1c",
    description: "Лечение травм опорно-двигательного аппарата, переломов, вывихов. Навыки гипсования, остеосинтеза, артроскопии и эндопротезирования суставов.",
    operations: ["Остеосинтез", "Эндопротезирование", "Артроскопия", "Реконструкция связок", "Остеотомия"],
    literature: [
      { title: "Травматология и ортопедия", author: "Корнилов Н.В.", year: 2021 },
      { title: "Переломы костей", author: "Анкин Л.Н.", year: 2019 },
    ],
    curator: { name: "Лобанов Кирилл Денисович", degree: "ординатор, куратор", contact: "+7 (391) 221-24-54", vk: "https://vk.com", tg: "https://t.me" },
    prevCurators: ["Лебедев М.С. (2016–2019)"],
  },
  {
    id: "gynecology" as Direction,
    name: "Гинекология",
    icon: "User",
    color: "#991b1b",
    description: "Оперативная гинекология — хирургические вмешательства на органах малого таза у женщин. Включает лапароскопические и открытые операции, навыки работы с гистероскопом.",
    operations: ["Лапароскопия", "Миомэктомия", "Гистерэктомия", "Кистэктомия", "Гистероскопия"],
    literature: [
      { title: "Оперативная гинекология", author: "Стрижаков А.Н.", year: 2020 },
      { title: "Эндоскопия в гинекологии", author: "Кулаков В.И.", year: 2018 },
    ],
    curator: { name: "Туркина Полина Игоревна", degree: "студент 5 курс", contact: "+7 (391) 221-24-55", vk: "https://vk.com", tg: "https://t.me" },
    prevCurators: ["Орлова Д.А. (2018–2021)"],
  },
  {
    id: "neuro" as Direction,
    name: "Нейрохирургия",
    icon: "Brain",
    color: "#7f1d1d",
    description: "Операции на головном и спинном мозге, периферической нервной системе. Одно из самых технически сложных и захватывающих направлений хирургии.",
    operations: ["Трепанация черепа", "Удаление опухолей", "Клипирование аневризм", "Ламинэктомия", "Шунтирование"],
    literature: [
      { title: "Нейрохирургия", author: "Гайдар Б.В.", year: 2020 },
      { title: "Клиническая нейрохирургия", author: "Зозуля Ю.А.", year: 2018 },
    ],
    curator: { name: "Соколова Анна Вячеславовна", degree: "студент 5 курс", contact: "+7 (391) 221-24-56", vk: "https://vk.com", tg: "https://t.me" },
    prevCurators: ["Зайцев П.К. (2019–2022)"],
  },
  {
    id: "urology" as Direction,
    name: "Урология",
    icon: "Droplets",
    color: "#a61c1c",
    description: "Хирургия органов мочеполовой системы. Включает эндоскопические, лапароскопические и открытые операции на почках, мочевом пузыре, предстательной железе.",
    operations: ["Нефрэктомия", "ТУР простаты", "Уретероскопия", "Цистоскопия", "Пиелопластика"],
    literature: [
      { title: "Урология", author: "Лопаткин Н.А.", year: 2021 },
      { title: "Оперативная урология", author: "Матвеев Б.П.", year: 2019 },
    ],
    curator: { name: "Морозов Иван Сергеевич", degree: "студент 4 курс", contact: "+7 (391) 221-24-57", vk: "https://vk.com", tg: "https://t.me" },
    prevCurators: ["Васин Д.Р. (2019–2022)"],
  },
  {
    id: "air" as Direction,
    name: "АИР",
    icon: "Activity",
    color: "#c0392b",
    description: "Анестезиология, интенсивная терапия и реанимация — направление, обеспечивающее безопасность пациента во время операции и в критических состояниях. Студенты осваивают методы обезболивания, ИВЛ, мониторинга.",
    operations: ["Интубация трахеи", "ИВЛ", "Спинальная анестезия", "Эпидуральная анестезия", "Центральный венозный доступ"],
    literature: [
      { title: "Анестезиология и реаниматология", author: "Зильбер А.П.", year: 2020 },
      { title: "Интенсивная терапия", author: "Мартынов А.И.", year: 2019 },
    ],
    curator: { name: "Захарова Елена Витальевна", degree: "студент 4 курс", contact: "+7 (391) 221-24-58", vk: "https://vk.com", tg: "https://t.me" },
    prevCurators: ["Новиков В.С. (2018–2021)"],
  },
];

const leaders = [
  { name: "Белов Александр Викторович", role: "Научный руководитель СХО", degree: "д.м.н., заведующий кафедрой хирургических болезней", img: DOCTOR_IMG },
  { name: "Чернова Ирина Михайловна", role: "Куратор СХО от кафедры", degree: "к.м.н., доцент кафедры хирургии", img: DOCTOR_IMG },
];

const curators = [
  { name: "Кузнецов Дмитрий Алексеевич", role: "Капитан СХО", year: "6 курс", img: DOCTOR_IMG },
  { name: "Соколова Анна Вячеславовна", role: "Зам. капитана", year: "5 курс", img: DOCTOR_IMG },
  { name: "Лобанов Кирилл Денисович", role: "Абдоминальное направление", year: "5 курс", img: DOCTOR_IMG },
  { name: "Туркина Полина Игоревна", role: "Торакальное направление", year: "5 курс", img: DOCTOR_IMG },
];

const team = [
  { name: "Морозов Иван С.", year: "4 курс", img: DOCTOR_IMG },
  { name: "Захарова Елена В.", year: "4 курс", img: DOCTOR_IMG },
  { name: "Васильев Тимур О.", year: "4 курс", img: DOCTOR_IMG },
  { name: "Никитина Ольга К.", year: "3 курс", img: DOCTOR_IMG },
  { name: "Громов Павел А.", year: "3 курс", img: DOCTOR_IMG },
  { name: "Степанова Юлия Р.", year: "3 курс", img: DOCTOR_IMG },
];

const alumni = [
  { name: "Белкин А.П.", year: "Выпуск 2023", img: DOCTOR_IMG },
  { name: "Романова К.С.", year: "Выпуск 2023", img: DOCTOR_IMG },
  { name: "Фёдоров Н.В.", year: "Выпуск 2022", img: DOCTOR_IMG },
  { name: "Суворова Д.А.", year: "Выпуск 2022", img: DOCTOR_IMG },
  { name: "Тихонов Е.Ю.", year: "Выпуск 2021", img: DOCTOR_IMG },
];

const theoryQuestions = [
  "Топографическая анатомия передней брюшной стенки",
  "Этапы первичной хирургической обработки раны",
  "Виды и техника наложения хирургических швов",
  "Асептика и антисептика в хирургии",
  "Основы местного и общего обезболивания",
  "Кровотечение: классификация, диагностика, методы остановки",
  "Перитонит: этиология, клиника, лечение",
  "Острая кишечная непроходимость: диагностика и тактика",
  "Основы лапароскопической хирургии",
  "Хирургическая инфекция: классификация, принципы лечения",
];

const practicalSkills = [
  { skill: "Завязывание хирургических узлов", desc: "Простой, морской, хирургический узел. Левой и правой рукой, инструментальный способ." },
  { skill: "Наложение прерывистого шва", desc: "Простой узловой шов на коже и апоневрозе. Техника вкола, завязывание, расстояние между стежками." },
  { skill: "Наложение непрерывного шва", desc: "Обвивной, матрацный шов. Правила завязывания концов нити." },
  { skill: "Сосудистый шов", desc: "Элементы сосудистого шва по Каррелю. Наложение шва на сосуд в условиях симулятора." },
  { skill: "Трахеостомия (муляж)", desc: "Техника разреза, формирование трахеостомы, фиксация канюли." },
  { skill: "Остановка кровотечения", desc: "Прижатие пальцем, жгут, перевязка в ране, зажим. Временные и окончательные методы." },
  { skill: "Дренирование плевральной полости", desc: "Техника установки дренажа по Бюлау. Точка Ларрея, точка Мортона." },
];

const evaluationCriteria = [
  { criterion: "Техника выполнения", max: 40, desc: "Правильная последовательность действий, точность движений" },
  { criterion: "Время выполнения", max: 20, desc: "Укладывается ли кандидат в норматив" },
  { criterion: "Знание показаний", max: 20, desc: "Умение объяснить когда и зачем применяется навык" },
  { criterion: "Соблюдение асептики", max: 10, desc: "Правила работы со стерильным инструментарием" },
  { criterion: "Теоретические вопросы", max: 10, desc: "Ответы на вопросы комиссии по анатомии и технике" },
];

type Application = {
  id: number; name: string; year: string; phone: string; email: string;
  direction: string; motivation: string; status: string; created_at: string;
};

export default function Index() {
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [activeDirection, setActiveDirection] = useState<Direction>("ssh");
  const [directionTab, setDirectionTab] = useState<"info" | "selection">("info");
  const [showApplication, setShowApplication] = useState(false);
  const [formData, setFormData] = useState({ name: "", year: "", phone: "", email: "", direction: "", motivation: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Admin
  const [adminKey, setAdminKey] = useState("");
  const [adminInput, setAdminInput] = useState("");
  const [adminApps, setAdminApps] = useState<Application[]>([]);
  const [adminLoading, setAdminLoading] = useState(false);
  const [adminError, setAdminError] = useState("");

  const currentDirection = directions.find(d => d.id === activeDirection)!;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Ошибка отправки");
      setSubmitted(true);
      setTimeout(() => {
        setShowApplication(false);
        setSubmitted(false);
        setFormData({ name: "", year: "", phone: "", email: "", direction: "", motivation: "" });
      }, 3000);
    } catch (err: unknown) {
      setSubmitError(err instanceof Error ? err.message : "Ошибка соединения");
    } finally {
      setSubmitting(false);
    }
  };

  const handleAdminLogin = async () => {
    setAdminLoading(true);
    setAdminError("");
    try {
      const res = await fetch(`${API_URL}?admin=${encodeURIComponent(adminInput)}`);
      if (res.status === 403) { setAdminError("Неверный пароль"); setAdminLoading(false); return; }
      const data = await res.json();
      setAdminApps(data.applications || []);
      setAdminKey(adminInput);
    } catch {
      setAdminError("Ошибка соединения");
    } finally {
      setAdminLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background font-montserrat">
      {/* NAV */}
      <nav className="sticky top-0 z-50 bg-navy shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab("home")}>
              <div className="w-9 h-9 rounded-full bg-teal flex items-center justify-center flex-shrink-0">
                <Icon name="Stethoscope" size={18} className="text-white" />
              </div>
              <div className="hidden sm:block">
                <div className="text-white font-bold text-sm leading-tight">СХО КрасГМУ</div>
                <div className="text-red-200 text-xs">Студенческое хирургическое общество</div>
              </div>
            </div>
            <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto">
              {([
                { id: "home", label: "Главная", icon: "Home" },
                { id: "directions", label: "Направления", icon: "Layers" },
                { id: "history", label: "История", icon: "BookOpen" },
                { id: "contacts", label: "Контакты", icon: "Phone" },
                { id: "admin", label: "Заявки", icon: "ClipboardList" },
              ] as const).map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`nav-link flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? "bg-teal text-white"
                      : "text-red-200 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <Icon name={tab.icon} size={15} />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
              <button
                onClick={() => setShowApplication(true)}
                className="ml-2 bg-gold hover:bg-yellow-400 text-navy font-semibold px-4 py-2 rounded-md text-sm transition-all hover:scale-105 whitespace-nowrap"
              >
                Оставить заявку
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ========== HOME ========== */}
      {activeTab === "home" && (
        <div>
          {/* HERO */}
          <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden hero-gradient">
            <div className="absolute inset-0 opacity-20">
              <img src={HERO_IMG} alt="СХО КрасГМУ" className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-navy/60" />
            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-slide-up">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-red-100 text-sm px-4 py-2 rounded-full mb-6 border border-white/20">
                <Icon name="MapPin" size={14} />
                Красноярский государственный медицинский университет
              </div>
              <h1 className="font-cormorant text-5xl sm:text-7xl text-white mb-4 leading-tight font-semibold">
                Студенческое<br />
                <span className="text-gold italic">хирургическое</span><br />
                общество
              </h1>
              <p className="text-red-100 text-lg sm:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
                Мы готовим будущих хирургов — через практику, наставничество и соревнования. Присоединяйся к команде, которая меняет медицину.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <button
                  onClick={() => setActiveTab("directions")}
                  className="bg-teal hover:bg-cyan-600 text-white font-semibold px-8 py-3 rounded-lg transition-all hover:scale-105 flex items-center gap-2"
                >
                  <Icon name="Layers" size={18} />
                  Наши направления
                </button>
                <button
                  onClick={() => setShowApplication(true)}
                  className="bg-gold hover:bg-yellow-400 text-navy font-semibold px-8 py-3 rounded-lg transition-all hover:scale-105 flex items-center gap-2"
                >
                  <Icon name="UserPlus" size={18} />
                  Подать заявку
                </button>
              </div>
            </div>
          </section>

          {/* STATS */}
          <section className="bg-navy py-10">
            <div className="max-w-6xl mx-auto px-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
                {[
                  { value: "15+", label: "лет работы" },
                  { value: "200+", label: "выпускников" },
                  { value: "5", label: "направлений" },
                  { value: "12", label: "олимпийских наград" },
                ].map(stat => (
                  <div key={stat.label}>
                    <div className="text-gold font-bold text-3xl sm:text-4xl font-cormorant">{stat.value}</div>
                    <div className="text-red-200 text-sm mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ABOUT */}
          <section className="py-16 px-4 max-w-6xl mx-auto">
            <div className="section-divider mb-12" />
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-teal text-sm font-semibold uppercase tracking-widest">О нас</span>
                <h2 className="font-cormorant text-4xl text-navy mt-2 mb-4 font-semibold">Кто мы такие?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Студенческое хирургическое общество КрасГМУ — это команда увлечённых студентов-медиков, которые хотят стать настоящими хирургами. Мы учимся не только в аудиториях — мы тренируемся в симуляционных лабораториях, участвуем в олимпиадах по всей стране и готовимся под руководством опытных наставников.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Здесь каждый найдёт своё направление: от абдоминальной до нейрохирургии. Мы принимаем студентов с 3 курса через конкурсный отбор.
                </p>
                <button
                  onClick={() => setActiveTab("history")}
                  className="border border-teal text-teal hover:bg-teal hover:text-white px-5 py-2.5 rounded-lg transition-all text-sm font-medium"
                >
                  История общества
                </button>
              </div>
              <div className="relative">
                <img src={OLYMPIAD_IMG} alt="Олимпиада" className="rounded-2xl shadow-xl w-full object-cover h-80" />
                <div className="absolute -bottom-4 -left-4 bg-gold text-navy font-bold px-6 py-3 rounded-xl shadow-lg">
                  <div className="text-lg">🏆 Чемпионы</div>
                  <div className="text-xs font-normal">Всероссийской олимпиады 2024</div>
                </div>
              </div>
            </div>
          </section>

          {/* РУКОВОДИТЕЛИ */}
          <section className="py-16 px-4 bg-slate-50">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <span className="text-teal text-sm font-semibold uppercase tracking-widest">Наставники</span>
                <h2 className="font-cormorant text-4xl text-navy mt-2 font-semibold">Руководители</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
                {leaders.map(l => (
                  <div key={l.name} className="bg-white rounded-2xl overflow-hidden shadow-md card-hover">
                    <img src={l.img} alt={l.name} className="w-full h-56 object-cover object-top" />
                    <div className="p-5">
                      <div className="bg-teal/10 text-teal text-xs font-semibold px-3 py-1 rounded-full inline-block mb-2">{l.role}</div>
                      <h3 className="font-semibold text-navy text-base leading-tight">{l.name}</h3>
                      <p className="text-muted-foreground text-sm mt-1">{l.degree}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* КУРАТОРЫ */}
          <section className="py-16 px-4 max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-emerald-custom text-sm font-semibold uppercase tracking-widest">Студенческий состав</span>
              <h2 className="font-cormorant text-4xl text-navy mt-2 font-semibold">Кураторы направлений</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {curators.map(c => (
                <div key={c.name} className="text-center card-hover">
                  <div className="relative mx-auto w-28 h-28 rounded-full overflow-hidden mb-4 ring-4 ring-teal/20">
                    <img src={c.img} alt={c.name} className="w-full h-full object-cover object-top" />
                  </div>
                  <h3 className="font-semibold text-navy text-sm leading-tight">{c.name}</h3>
                  <p className="text-teal text-xs mt-1">{c.role}</p>
                  <p className="text-muted-foreground text-xs">{c.year}</p>
                </div>
              ))}
            </div>
          </section>

          {/* КОМАНДА */}
          <section className="py-16 px-4 bg-slate-50">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <span className="text-teal text-sm font-semibold uppercase tracking-widest">Актуальный состав</span>
                <h2 className="font-cormorant text-4xl text-navy mt-2 font-semibold">Наша команда</h2>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
                {team.map(m => (
                  <div key={m.name} className="text-center">
                    <div className="w-20 h-20 rounded-xl overflow-hidden mx-auto mb-2 shadow-sm">
                      <img src={m.img} alt={m.name} className="w-full h-full object-cover object-top" />
                    </div>
                    <p className="text-xs font-medium text-navy leading-tight">{m.name}</p>
                    <p className="text-xs text-muted-foreground">{m.year}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ALUMNI */}
          <section className="py-16 px-4 max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-gold text-sm font-semibold uppercase tracking-widest">Выпускники</span>
              <h2 className="font-cormorant text-4xl text-navy mt-2 font-semibold">Предыдущие участники</h2>
              <p className="text-muted-foreground mt-2 text-sm">Они прошли путь в СХО и теперь строят карьеру в медицине</p>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-5">
              {alumni.map(a => (
                <div key={a.name} className="text-center">
                  <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-2 grayscale hover:grayscale-0 transition-all ring-2 ring-gold/30">
                    <img src={a.img} alt={a.name} className="w-full h-full object-cover object-top" />
                  </div>
                  <p className="text-xs font-medium text-navy leading-tight">{a.name}</p>
                  <p className="text-xs text-muted-foreground">{a.year}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="hero-gradient py-20 px-4 text-center">
            <h2 className="font-cormorant text-4xl sm:text-5xl text-white mb-4 font-semibold">
              Готов стать <span className="text-gold italic">хирургом?</span>
            </h2>
            <p className="text-red-100 mb-8 max-w-xl mx-auto">Подай заявку на отбор и начни свой путь в хирургии вместе с нами</p>
            <button
              onClick={() => setShowApplication(true)}
              className="bg-gold hover:bg-yellow-400 text-navy font-bold px-10 py-4 rounded-xl text-lg transition-all hover:scale-105 shadow-lg"
            >
              Оставить заявку на отбор
            </button>
          </section>
        </div>
      )}

      {/* ========== DIRECTIONS ========== */}
      {activeTab === "directions" && (
        <div className="min-h-screen">
          <div className="hero-gradient py-16 px-4 text-center">
            <h1 className="font-cormorant text-5xl text-white mb-3 font-semibold">Направления</h1>
            <p className="text-red-200 text-lg">Выбери специализацию и углубись в хирургию</p>
          </div>

          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex flex-wrap gap-3 mb-8">
              {directions.map(d => (
                <button
                  key={d.id}
                  onClick={() => setActiveDirection(d.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all ${
                    activeDirection === d.id
                      ? "text-white shadow-md scale-105"
                      : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200"
                  }`}
                  style={activeDirection === d.id ? { backgroundColor: d.color } : {}}
                >
                  <Icon name={d.icon} size={16} />
                  {d.name}
                </button>
              ))}
            </div>

            <div className="flex gap-4 mb-8 border-b border-slate-200">
              {(["info", "selection"] as const).map(t => (
                <button
                  key={t}
                  onClick={() => setDirectionTab(t)}
                  className={`pb-3 px-1 font-medium text-sm border-b-2 transition-all ${
                    directionTab === t ? "border-teal text-teal" : "border-transparent text-muted-foreground hover:text-navy"
                  }`}
                >
                  {t === "info" ? "О направлении" : "Отбор"}
                </button>
              ))}
            </div>

            {directionTab === "info" && (
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                    <h2 className="font-cormorant text-3xl text-navy mb-3 font-semibold">{currentDirection.name}</h2>
                    <p className="text-slate-600 leading-relaxed">{currentDirection.description}</p>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                    <h3 className="font-semibold text-navy mb-4 flex items-center gap-2">
                      <Icon name="Scissors" size={18} className="text-teal" />
                      Основные операции
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {currentDirection.operations.map(op => (
                        <span key={op} className="bg-teal/10 text-teal px-3 py-1.5 rounded-lg text-sm font-medium">{op}</span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                    <h3 className="font-semibold text-navy mb-4 flex items-center gap-2">
                      <Icon name="BookOpen" size={18} className="text-emerald-custom" />
                      Рекомендуемая литература
                    </h3>
                    <div className="space-y-3">
                      {currentDirection.literature.map((book, i) => (
                        <div key={i} className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl">
                          <div className="w-8 h-10 bg-emerald-custom/20 rounded flex items-center justify-center flex-shrink-0 text-lg">📗</div>
                          <div>
                            <p className="font-medium text-navy text-sm">{book.title}</p>
                            <p className="text-muted-foreground text-xs">{book.author}, {book.year}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                    <h3 className="font-semibold text-navy mb-4 flex items-center gap-2">
                      <Icon name="User" size={18} className="text-teal" />
                      Куратор направления
                    </h3>
                    <img src={DOCTOR_IMG} alt={currentDirection.curator.name} className="w-full h-40 object-cover object-top rounded-xl mb-4" />
                    <p className="font-semibold text-navy">{currentDirection.curator.name}</p>
                    <p className="text-muted-foreground text-sm mb-4">{currentDirection.curator.degree}</p>
                    <a href={`tel:${currentDirection.curator.contact}`} className="flex items-center gap-2 text-teal text-sm hover:underline mb-3">
                      <Icon name="Phone" size={14} />
                      {currentDirection.curator.contact}
                    </a>
                    <div className="flex gap-3">
                      <a href={currentDirection.curator.vk} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 bg-slate-700 text-white text-xs px-3 py-1.5 rounded-lg hover:bg-slate-800 transition-colors">
                        <Icon name="Users" size={13} />
                        ВКонтакте
                      </a>
                      <a href={currentDirection.curator.tg} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 bg-slate-600 text-white text-xs px-3 py-1.5 rounded-lg hover:bg-slate-700 transition-colors">
                        <Icon name="Send" size={13} />
                        Telegram
                      </a>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                    <h3 className="font-semibold text-navy mb-3 flex items-center gap-2">
                      <Icon name="Clock" size={18} className="text-gold" />
                      Предыдущие кураторы
                    </h3>
                    {currentDirection.prevCurators.map((c, i) => (
                      <div key={i} className="text-sm text-slate-600 py-2 border-b border-slate-100 last:border-0">{c}</div>
                    ))}
                  </div>

                  <button
                    onClick={() => setShowApplication(true)}
                    style={{ backgroundColor: currentDirection.color }}
                    className="w-full text-white font-semibold py-3 rounded-xl transition-all hover:opacity-90 flex items-center justify-center gap-2"
                  >
                    <Icon name="UserPlus" size={18} />
                    Подать заявку
                  </button>
                </div>
              </div>
            )}

            {directionTab === "selection" && (
              <div className="space-y-8">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gold/20 rounded-xl flex items-center justify-center">
                      <Icon name="Calendar" size={20} className="text-gold" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-navy">Ближайший отбор</h3>
                      <p className="text-muted-foreground text-sm">Весенний набор 2025</p>
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {[
                      { label: "Дата", value: "15 марта 2025", icon: "Calendar" },
                      { label: "Место", value: "Кафедра хирургии, ауд. 204", icon: "MapPin" },
                      { label: "Регистрация до", value: "10 марта 2025", icon: "Clock" },
                    ].map(item => (
                      <div key={item.label} className="bg-slate-50 rounded-xl p-4 flex items-start gap-3">
                        <Icon name={item.icon} size={18} className="text-teal mt-0.5" />
                        <div>
                          <p className="text-xs text-muted-foreground">{item.label}</p>
                          <p className="font-medium text-navy text-sm">{item.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                  <h3 className="font-semibold text-navy mb-4 flex items-center gap-2">
                    <Icon name="BookOpen" size={18} className="text-teal" />
                    Теоретические вопросы
                  </h3>
                  <div className="space-y-2">
                    {theoryQuestions.map((q, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                        <span className="w-6 h-6 bg-teal/20 text-teal rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">{i + 1}</span>
                        <p className="text-sm text-slate-700">{q}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                  <h3 className="font-semibold text-navy mb-2 flex items-center gap-2">
                    <Icon name="Scissors" size={18} className="text-emerald-custom" />
                    Практические навыки
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">Навыки, которые проверяются на отборе. Рекомендуем также смотреть видео-уроки.</p>
                  <div className="space-y-3">
                    {practicalSkills.map((s, i) => (
                      <div key={i} className="border border-slate-200 rounded-xl p-4">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="w-6 h-6 bg-emerald-custom/20 text-emerald-custom rounded flex items-center justify-center text-xs font-bold flex-shrink-0">{i + 1}</span>
                          <p className="font-medium text-navy text-sm">{s.skill}</p>
                        </div>
                        <p className="text-muted-foreground text-xs ml-9">{s.desc}</p>
                        <div className="ml-9 mt-2">
                          <div className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-teal/10 text-slate-500 hover:text-teal text-xs px-3 py-1.5 rounded-lg cursor-pointer transition-colors">
                            <Icon name="Play" size={12} />
                            Видео-урок (скоро)
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                  <h3 className="font-semibold text-navy mb-4 flex items-center gap-2">
                    <Icon name="Award" size={18} className="text-gold" />
                    Критерии оценки
                  </h3>
                  <div className="space-y-3">
                    {evaluationCriteria.map((c, i) => (
                      <div key={i} className="flex items-start gap-4 p-3 bg-slate-50 rounded-xl">
                        <div className="text-center flex-shrink-0">
                          <div className="text-xl font-bold text-gold">{c.max}</div>
                          <div className="text-xs text-muted-foreground">баллов</div>
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-navy text-sm">{c.criterion}</p>
                          <p className="text-muted-foreground text-xs mt-0.5">{c.desc}</p>
                        </div>
                        <div className="flex-shrink-0 flex items-center">
                          <div className="w-16 bg-slate-200 rounded-full h-2">
                            <div className="bg-teal h-2 rounded-full" style={{ width: `${c.max}%` }} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-3 bg-teal/10 rounded-xl">
                    <p className="text-sm text-teal font-medium">Итого: 100 баллов</p>
                    <p className="text-xs text-slate-600 mt-0.5">Для прохождения необходимо набрать не менее 60 баллов</p>
                  </div>
                </div>

                <div className="text-center">
                  <button
                    onClick={() => setShowApplication(true)}
                    className="bg-teal hover:bg-cyan-700 text-white font-semibold px-10 py-4 rounded-xl text-lg transition-all hover:scale-105 shadow-lg"
                  >
                    Записаться на отбор
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========== HISTORY ========== */}
      {activeTab === "history" && (
        <div className="min-h-screen">
          <div className="hero-gradient py-16 px-4 text-center">
            <h1 className="font-cormorant text-5xl text-white mb-3 font-semibold">История общества</h1>
            <p className="text-red-200 text-lg">Более 15 лет хирургического образования</p>
          </div>

          <div className="max-w-5xl mx-auto px-4 py-12 space-y-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <img src={HERO_IMG} alt="История СХО" className="rounded-2xl shadow-xl w-full h-64 object-cover" />
              <div>
                <span className="text-teal text-sm font-semibold uppercase tracking-widest">Истоки</span>
                <h2 className="font-cormorant text-3xl text-navy mt-2 mb-4 font-semibold">Как всё началось</h2>
                <p className="text-slate-600 leading-relaxed">
                  Студенческое хирургическое общество КрасГМУ было основано в 2008 году группой энтузиастов под руководством кафедры хирургических болезней. Первоначально небольшой кружок быстро стал полноценным студенческим научным обществом с чёткой структурой и программой подготовки.
                </p>
              </div>
            </div>

            <div>
              <h2 className="font-cormorant text-3xl text-navy mb-8 text-center font-semibold">Хронология</h2>
              <div className="relative">
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-teal to-emerald-custom" />
                {[
                  { year: "2008", event: "Основание СХО КрасГМУ. Первые 12 участников." },
                  { year: "2012", event: "Первая победа на региональной олимпиаде по хирургии в Новосибирске." },
                  { year: "2015", event: "Открытие симуляционной лаборатории. Начало регулярных практических занятий." },
                  { year: "2018", event: "Первое место на Всероссийской студенческой олимпиаде по хирургии." },
                  { year: "2021", event: "Расширение до 5 направлений. Запуск программы менторства." },
                  { year: "2024", event: "Победа на международной олимпиаде. Более 200 выпускников." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 mb-8 relative">
                    <div className="w-12 h-12 rounded-full bg-teal text-white flex items-center justify-center text-xs font-bold flex-shrink-0 z-10">
                      {item.year.slice(2)}
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex-1 mt-1">
                      <p className="font-semibold text-gold text-sm mb-1">{item.year}</p>
                      <p className="text-slate-700 text-sm">{item.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-navy rounded-2xl p-8 text-white">
              <h2 className="font-cormorant text-3xl mb-6 text-center font-semibold">Достижения</h2>
              <div className="grid sm:grid-cols-3 gap-6">
                {[
                  { icon: "Trophy", count: "12", label: "Призовых мест на олимпиадах" },
                  { icon: "Users", count: "200+", label: "Выпускников работают врачами" },
                  { icon: "Star", count: "8", label: "Кандидатов медицинских наук" },
                ].map(a => (
                  <div key={a.label} className="text-center">
                    <Icon name={a.icon} size={32} className="text-gold mx-auto mb-2" />
                    <div className="font-cormorant text-4xl text-gold font-semibold">{a.count}</div>
                    <p className="text-red-200 text-sm mt-1">{a.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-cormorant text-3xl text-navy mb-8 text-center font-semibold">Фотогалерея</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[HERO_IMG, OLYMPIAD_IMG, HERO_IMG, OLYMPIAD_IMG, HERO_IMG, OLYMPIAD_IMG].map((img, i) => (
                  <div key={i} className="rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <img src={img} alt={`Фото ${i + 1}`} className="w-full h-40 object-cover hover:scale-105 transition-transform duration-300" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========== CONTACTS ========== */}
      {activeTab === "contacts" && (
        <div className="min-h-screen">
          <div className="hero-gradient py-16 px-4 text-center">
            <h1 className="font-cormorant text-5xl text-white mb-3 font-semibold">Контакты</h1>
            <p className="text-red-200 text-lg">Свяжитесь с нами</p>
          </div>

          <div className="max-w-5xl mx-auto px-4 py-12">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                  <h2 className="font-semibold text-navy text-lg mb-5 flex items-center gap-2">
                    <Icon name="User" size={20} className="text-teal" />
                    Капитан СХО
                  </h2>
                  <img src={DOCTOR_IMG} alt="Капитан" className="w-24 h-24 rounded-full object-cover object-top mb-4 ring-4 ring-teal/20" />
                  <p className="font-semibold text-navy text-base">Кузнецов Дмитрий Алексеевич</p>
                  <p className="text-muted-foreground text-sm mb-4">6 курс, Лечебный факультет</p>
                  <div className="space-y-2">
                    <a href="tel:+79991234567" className="flex items-center gap-2 text-teal text-sm hover:underline">
                      <Icon name="Phone" size={15} />
                      +7 (999) 123-45-67
                    </a>
                    <a href="mailto:sho@krasgmu.ru" className="flex items-center gap-2 text-teal text-sm hover:underline">
                      <Icon name="Mail" size={15} />
                      sho@krasgmu.ru
                    </a>
                  </div>
                  <div className="flex gap-3 mt-4">
                    <a href="https://vk.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-slate-700 text-white text-sm px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors">
                      <Icon name="Users" size={16} />
                      ВКонтакте
                    </a>
                    <a href="https://t.me" target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-slate-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors">
                      <Icon name="Send" size={16} />
                      Telegram
                    </a>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                  <h2 className="font-semibold text-navy text-lg mb-4 flex items-center gap-2">
                    <Icon name="MapPin" size={20} className="text-teal" />
                    Адрес
                  </h2>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    660022, г. Красноярск,<br />
                    ул. Партизана Железняка, 1<br />
                    КрасГМУ, кафедра хирургических болезней<br />
                    Корпус 2, аудитория 204
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                  <h2 className="font-semibold text-navy text-lg mb-5 flex items-center gap-2">
                    <Icon name="Clock" size={20} className="text-teal" />
                    Расписание занятий
                  </h2>
                  <div className="space-y-3">
                    {[
                      { day: "Вторник", time: "17:00 – 19:00", type: "Теория" },
                      { day: "Четверг", time: "17:00 – 20:00", type: "Практика" },
                      { day: "Суббота", time: "10:00 – 13:00", type: "Симуляции" },
                    ].map(s => (
                      <div key={s.day} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-teal flex-shrink-0" />
                          <span className="font-medium text-navy text-sm">{s.day}</span>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-slate-700">{s.time}</p>
                          <p className="text-xs text-muted-foreground">{s.type}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                  <h2 className="font-semibold text-navy text-lg mb-4 flex items-center gap-2">
                    <Icon name="Share2" size={20} className="text-teal" />
                    Социальные сети
                  </h2>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { name: "ВКонтакте", icon: "Users", color: "bg-slate-700", url: "https://vk.com" },
                      { name: "Telegram", icon: "Send", color: "bg-slate-600", url: "https://t.me" },
                      { name: "Instagram", icon: "Camera", color: "bg-rose-700", url: "#" },
                      { name: "YouTube", icon: "Play", color: "bg-red-800", url: "#" },
                    ].map(s => (
                      <a
                        key={s.name}
                        href={s.url}
                        target="_blank"
                        rel="noreferrer"
                        className={`${s.color} text-white rounded-xl p-3 flex items-center gap-2 text-sm font-medium hover:opacity-90 transition-opacity`}
                      >
                        <Icon name={s.icon} size={18} />
                        {s.name}
                      </a>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setShowApplication(true)}
                  className="w-full bg-teal hover:bg-cyan-700 text-white font-semibold py-4 rounded-xl transition-all hover:scale-105 flex items-center justify-center gap-2 shadow-lg"
                >
                  <Icon name="UserPlus" size={20} />
                  Оставить заявку на отбор
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========== ADMIN ========== */}
      {activeTab === "admin" && (
        <div className="min-h-screen">
          <div className="hero-gradient py-16 px-4 text-center">
            <h1 className="font-cormorant text-5xl text-white mb-3 font-semibold">Заявки на отбор</h1>
            <p className="text-red-200 text-lg">Только для администраторов СХО</p>
          </div>
          <div className="max-w-5xl mx-auto px-4 py-12">
            {!adminKey ? (
              <div className="max-w-sm mx-auto bg-white rounded-2xl p-8 shadow-sm border border-slate-100 text-center">
                <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Lock" size={24} className="text-teal" />
                </div>
                <h2 className="font-semibold text-navy text-lg mb-1">Вход для администратора</h2>
                <p className="text-muted-foreground text-sm mb-5">Введите пароль для просмотра заявок</p>
                <Input
                  type="password"
                  value={adminInput}
                  onChange={e => setAdminInput(e.target.value)}
                  placeholder="Пароль"
                  className="mb-3"
                  onKeyDown={e => e.key === "Enter" && handleAdminLogin()}
                />
                {adminError && <p className="text-red-600 text-sm mb-3">{adminError}</p>}
                <button
                  onClick={handleAdminLogin}
                  disabled={adminLoading}
                  className="w-full bg-teal text-white font-semibold py-2.5 rounded-lg hover:bg-red-700 transition-all disabled:opacity-60"
                >
                  {adminLoading ? "Загрузка..." : "Войти"}
                </button>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="font-semibold text-navy text-xl">Всего заявок: {adminApps.length}</h2>
                    <p className="text-muted-foreground text-sm">Новые заявки на вступление в СХО</p>
                  </div>
                  <button
                    onClick={() => { setAdminKey(""); setAdminInput(""); setAdminApps([]); }}
                    className="text-sm text-slate-500 hover:text-navy flex items-center gap-1"
                  >
                    <Icon name="LogOut" size={15} />
                    Выйти
                  </button>
                </div>
                {adminApps.length === 0 ? (
                  <div className="text-center py-16 text-muted-foreground">
                    <Icon name="Inbox" size={40} className="mx-auto mb-3 opacity-30" />
                    <p>Заявок пока нет</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {adminApps.map(app => (
                      <div key={app.id} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                        <div className="flex items-start justify-between gap-4 flex-wrap">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-2 flex-wrap">
                              <h3 className="font-semibold text-navy">{app.name}</h3>
                              <span className="bg-red-100 text-teal text-xs font-medium px-2.5 py-0.5 rounded-full">{app.year}</span>
                              {app.direction && (
                                <span className="bg-slate-100 text-slate-600 text-xs px-2.5 py-0.5 rounded-full">{app.direction}</span>
                              )}
                            </div>
                            <div className="flex flex-wrap gap-4 text-sm text-slate-600 mb-2">
                              <a href={`tel:${app.phone}`} className="flex items-center gap-1.5 hover:text-teal">
                                <Icon name="Phone" size={13} />
                                {app.phone}
                              </a>
                              <a href={`mailto:${app.email}`} className="flex items-center gap-1.5 hover:text-teal">
                                <Icon name="Mail" size={13} />
                                {app.email}
                              </a>
                            </div>
                            {app.motivation && (
                              <p className="text-slate-500 text-sm italic">«{app.motivation}»</p>
                            )}
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p className="text-xs text-muted-foreground">
                              {new Date(app.created_at).toLocaleDateString("ru-RU", { day: "numeric", month: "short", year: "numeric" })}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(app.created_at).toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" })}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-navy py-10 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-teal flex items-center justify-center">
              <Icon name="Stethoscope" size={18} className="text-white" />
            </div>
            <div>
              <div className="text-white font-bold text-sm">СХО КрасГМУ</div>
              <div className="text-red-300 text-xs">© 2008 — 2025</div>
            </div>
          </div>
          <div className="flex gap-4">
            {(["home", "directions", "history", "contacts"] as const).map(t => (
              <button key={t} onClick={() => setActiveTab(t)} className="text-red-200 hover:text-white text-sm transition-colors">
                {{ home: "Главная", directions: "Направления", history: "История", contacts: "Контакты" }[t]}
              </button>
            ))}
          </div>
        </div>
      </footer>

      {/* APPLICATION DIALOG */}
      <Dialog open={showApplication} onOpenChange={setShowApplication}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-cormorant text-2xl text-navy">
              Заявка на отбор в СХО
            </DialogTitle>
          </DialogHeader>
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4 mt-2">
              <div>
                <Label htmlFor="name" className="text-sm font-medium text-navy">ФИО *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Иванов Иван Иванович"
                  required
                  className="mt-1"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="year" className="text-sm font-medium text-navy">Курс *</Label>
                  <Input
                    id="year"
                    value={formData.year}
                    onChange={e => setFormData({ ...formData, year: e.target.value })}
                    placeholder="3 курс"
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-sm font-medium text-navy">Телефон *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+7 (999) 123-45-67"
                    required
                    className="mt-1"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="email" className="text-sm font-medium text-navy">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  placeholder="ivanov@krasgmu.ru"
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="direction" className="text-sm font-medium text-navy">Желаемое направление</Label>
                <select
                  id="direction"
                  value={formData.direction}
                  onChange={e => setFormData({ ...formData, direction: e.target.value })}
                  className="mt-1 w-full border border-input rounded-md px-3 py-2 text-sm bg-background"
                >
                  <option value="">Не определился</option>
                  {directions.map(d => (
                    <option key={d.id} value={d.name}>{d.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="motivation" className="text-sm font-medium text-navy">Почему хочешь вступить в СХО?</Label>
                <Textarea
                  id="motivation"
                  value={formData.motivation}
                  onChange={e => setFormData({ ...formData, motivation: e.target.value })}
                  placeholder="Расскажи немного о себе и своей мотивации..."
                  rows={3}
                  className="mt-1 resize-none"
                />
              </div>
              {submitError && (
                <p className="text-red-600 text-sm bg-red-50 px-3 py-2 rounded-lg">{submitError}</p>
              )}
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-teal hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition-all hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <Icon name={submitting ? "Loader" : "Send"} size={18} className={submitting ? "animate-spin" : ""} />
                {submitting ? "Отправляем..." : "Отправить заявку"}
              </button>
              <p className="text-xs text-muted-foreground text-center">
                Мы свяжемся с тобой в течение 2–3 рабочих дней
              </p>
            </form>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="CheckCircle" size={32} className="text-teal" />
              </div>
              <h3 className="font-semibold text-navy text-lg mb-2">Заявка отправлена!</h3>
              <p className="text-muted-foreground text-sm">Мы свяжемся с тобой в ближайшее время. Удачи на отборе! 🩺</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}