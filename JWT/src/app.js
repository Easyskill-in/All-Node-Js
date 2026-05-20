const express = require('express');
const path = require('path');

const JWT = require("jsonwebtoken");
const { JWT_SECRET } = require('../Config/Config');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    res.send('Server is running 🚀');
});

app.get("/login", async (req, res) => {
    const User = { username: "Username", _id: 101, password: "admin@123" }

    try {
        const token =
            await JWT.sign(
                User,
                JWT_SECRET, { expiresIn: "1m" })

        res.status(200).json({
            success: true,
            token
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
})


app.get("/user/:token", async (req, res) => {
    const { token } = req.params
    try {
        const TokenData = await JWT.verify(token, JWT_SECRET)

        res.status(200).json({
            success: true,
            TokenData
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

module.exports = app

