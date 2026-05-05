const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title: String,
    description: String,

    status: {
        type: String,
        default: "pending"
    },

    dueDate: Date,   // ✅ ADD THIS

    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

module.exports = mongoose.model("Task", taskSchema);