
-- Stage 4: Basic SQL queries

-- Show all tasks
SELECT * FROM tasks;

-- Show completed tasks
SELECT * FROM tasks WHERE done = 1;

-- Count all tasks
SELECT COUNT(*) FROM tasks;

-- Mark all tasks as completed
UPDATE tasks SET done = 1;

-- Delete completed tasks
DELETE FROM tasks WHERE done = 1;
