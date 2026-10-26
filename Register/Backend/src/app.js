const express = require('express');
const cors = require('cors');
const { WriteData, FindData, FindByUsername } = require('../database/Functions');
const { FRONTEND_URL, JWT_SECRET } = require('./Config/env');

const bcrypt = require("bcrypt")
const JWT = require("jsonwebtoken")
const CookieParser = require("cookie-parser");
const { JWT_Verify } = require('./Middleware/Auth');

const app = express();

// Middleware

app.use(cors({
    origin: FRONTEND_URL,
    credentials: true
}))

app.use(CookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', JWT_Verify, (req, res) => {

    res.json(
        {
            message: 'Server is running 🚀',
            data: req.user
        });
});

app.post("/submit", async (req, res) => {
    const { username, password, email } = req.body;

    try {

        if (!username) {
            return res.json({
                success: false,
                message: "username is required"
            })
        }

        const hashPassword = await bcrypt.hash(password, 10)


        const ans = await WriteData({ username, password: hashPassword, email })

        res.status(201).json({
            success: true,
            message: "User register successfully..."
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error
        })
    }
})
app.post("/login", async (req, res) => {
    const { username, password, } = req.body;

    try {

        if (!username) {
            return res.json({
                success: false,
                message: "username is required"
            })
        }
        if (!password) {
            return res.json({
                success: false,
                message: "password is required"
            })
        }

        console.log("Data : ", req.body);


        const user = await FindByUsername(username)
        console.log("USER  : ", user);

        if (!user) {
            return res.json({
                success: false,
                message: "User Not Found"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.json({
                success: false,
                message: "Invalid Password"
            })
        }



        const token = JWT.sign(user, JWT_SECRET, { expiresIn: "1m" })

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 1000 * 60
        })



        res.status(201).json({
            success: true,
            message: "User Login successfully..."
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error
        })
    }
})

module.exports = app;