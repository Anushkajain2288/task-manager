const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Signup
router.post("/signup", async (req, res) => {
   const { name, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
    name,
    email,
    password: hashedPassword,
    role: role || "member"
});

    await user.save();
    res.send("User registered");
});

// Login

router.post("/login", async (req, res) => {
    try {
       const { name, email, password, role } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

if (!isMatch) {
    return res.status(400).json({ message: "Invalid password" });
}

        const token = jwt.sign(
            { id: user._id, role: user.role },
            "secretkey"
        );

        res.json({ token });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});
// GET ALL USERS
router.get("/users", async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.json(users);
    } catch (err) {
        res.status(500).send("Error fetching users");
    }
});
module.exports = router;