const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// Create task
router.post("/", async (req, res) => {
    const task = new Task(req.body);
    await task.save();
    res.send(task);
});

// Get all tasks
router.get("/", async (req, res) => {
    const tasks = await Task.find().populate("assignedTo","name");
    res.send(tasks);
});

// Update status
router.put("/:id", async (req, res) => {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(task);
});

// DELETE TASK
router.delete("/:id", async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.send("Task deleted");
    } catch (err) {
        res.status(500).send("Error deleting task");
    }
});

module.exports = router;