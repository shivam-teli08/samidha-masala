const userAuth = require('../models/user-auth.model');
const jwt = require('jsonwebtoken');
const generateToken = (id) => {
    return jwt.sign(
        { id },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );
};
const registerUser = async (req, res) => {
    try {
        const { name, email, phoneno, password } = req.body;
        if (!name || !email || !phoneno || !password) {
            return res.status(400).json({ message: "name, email, phoneno and password are required" });
        }
        const existingUser = await userAuth.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const User = await userAuth.create({
            name,
            email,
            phoneno,
            password
        });
        const token = generateToken(User._id);
        res.status(201).json({
            _id: User._id,
            name: User.name,
            email: User.email,
            phoneno: User.phoneno,
            token
        });
    } catch (err) {
        console.log("Register user error:", err.message);
        res.status(500).json({ message: "Server error" });
    }
};
const signInUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const User = await userAuth.findOne({ email });
        if (!User) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const isMatch = await User.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = generateToken(User._id);
        res.status(200).json({
            _id: User._id,
            name: User.name,
            email: User.email,
            phoneno: User.phoneno,
            token
        });
    } catch (err) {
        console.log("Sign in user error:", err.message);
        res.status(500).json({ message: "Server error" });
    }
};
module.exports = {
    registerUser,
    signInUser
};
