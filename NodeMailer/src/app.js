const express = require('express');
const path = require('path');
const SendEmail = require('../Services/SendMail');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.send('Server is running 🚀');
});

app.post("/", async (req, res) => {
    const { email } = req.body;
    try {
        const messageId = await SendEmail(email, "Test Subject", "This is a test email", "<h1>This is a test email</h1>");
        res.json({
            success: true,
            message: "Email sent successfully",
            messageId
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

module.exports = app;