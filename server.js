const express = require("express");
const repo = require("./repository");

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Task CRUD API is running!" });
});

app.get("/tasks", async (req, res) => {
  try {
    res.json(await repo.getAllTasks());
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
});

app.get("/tasks/:id", async (req, res) => {
  try {
    const task = await repo.getTaskById(req.params.id);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
});

app.post("/tasks", async (req, res) => {
  const title = req.body.title;

  if (typeof title !== "string" || title.trim() === "") {
    return res.status(400).json({ error: "Title is required" });
  }

  try {
    const task = await repo.createTask(title);
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
});

app.put("/tasks/:id", async (req, res) => {
  const { title, done } = req.body;

  if (
    typeof title !== "string" ||
    title.trim() === "" ||
    typeof done !== "boolean"
  ) {
    return res.status(400).json({ error: "Invalid task data" });
  }

  try {
    const task = await repo.updateTask(req.params.id, title, done);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
});

app.delete("/tasks/:id", async (req, res) => {
  try {
    const task = await repo.deleteTask(req.params.id);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
