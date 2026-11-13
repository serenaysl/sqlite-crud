CREATE TABLE IF NOT EXISTS tasks (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  done BOOLEAN NOT NULL DEFAULT FALSE
);

INSERT INTO tasks (title, done)
SELECT title, FALSE
FROM (
  VALUES
    ('Learn PostgreSQL'),
    ('Build CRUD API'),
    ('Test Docker')
) AS examples(title)
WHERE NOT EXISTS (SELECT 1 FROM tasks);
