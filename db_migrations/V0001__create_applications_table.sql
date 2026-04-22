CREATE TABLE t_p7762886_student_surgery_soci.applications (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  year TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  direction TEXT,
  motivation TEXT,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT NOW()
);