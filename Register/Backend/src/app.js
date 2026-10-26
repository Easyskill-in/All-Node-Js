const express = require('express');
const cors = require('cors');
const { WriteData, FindData, FindByUsername } = require('../database/Functions');
const { FRONTEND_URL } = require('./Config/env');

const bcrypt = require("bcrypt")

const app = express();

// Middleware

app.use(cors({
    origin: FRONTEND_URL
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Server is running 🚀');
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