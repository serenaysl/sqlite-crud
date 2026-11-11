
const express = require("express");
const Database = require("better-sqlite3");
const db = new Database("tasks.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    done INTEGER NOT NULL DEFAULT 0
  )
`);

const result = db.prepare("SELECT COUNT(*) AS count FROM tasks").get();
console.log("Total tasks:", result.count);
if (result.count === 0) {
  const insert = db.prepare(
    "INSERT INTO tasks (title, done) VALUES (?, ?)"
  );

  insert.run("Learn SQLite", 0);
  insert.run("Build CRUD API", 0);
  insert.run("Test database", 0);

  console.log("3 example tasks added.");
}

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Week 3 SQLite CRUD API is running!" });
});

app.get("/tasks", (req, res) => {
  const tasks = db.prepare("SELECT * FROM tasks").all();

  res.json(tasks);
});

app.get("/tasks/:id", (req, res) => {
  const id = req.params.id;

  const task = db.prepare(
    "SELECT * FROM tasks WHERE id = ?"
  ).get(id);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.json(task);
});

app.post("/tasks", (req, res) => {
  const title = req.body.title;

  if (typeof title !== "string" || title.trim() === "") {
    return res.status(400).json({ error: "Title is required" });
  }

  const result = db.prepare(
    "INSERT INTO tasks (title, done) VALUES (?, ?)"
  ).run(title, 0);

  const task = db.prepare(
    "SELECT * FROM tasks WHERE id = ?"
  ).get(result.lastInsertRowid);

  res.status(201).json(task);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
