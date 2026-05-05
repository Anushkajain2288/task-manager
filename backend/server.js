const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/taskmanager")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

const taskRoutes = require("./routes/task");
app.use("/api/tasks", taskRoutes);




app.get("/", (req, res) => {
    res.send("Server Running");
});

app.listen(5000, () => {
    console.log("Server started on port 5000");
});