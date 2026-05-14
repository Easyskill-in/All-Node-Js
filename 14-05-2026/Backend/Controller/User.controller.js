const UserModel = require('../Model/User.model');
const bcrypt = require('bcrypt');
const cloudinary = require('../Config/Cloudinary.js');
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        console.log({ name, email, password, file: req.file })

        const existingUser = await UserModel
            .findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }


        const hashedPassword = await bcrypt.hash(password, 10);

        const profile = await cloudinary.uploader.upload(req.file.path, {
            folder: "INSTAGRAM",
            public_id: req.file.filename
        })


        const newUser = new UserModel({
            name,
            email,
            password: hashedPassword,
            profile: profile.secure_url
        });

        await newUser.save();

        return res.status(201).json({ message: "User registered successfully", user: newUser });

    } catch (error) {
        console.error("Error in user registration:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

const loginUser = async (req, res) => {
    console.log("LOgin.......", req.body);

    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        console.log(req.body)

        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        return res.status(200).json({ message: "Login successful", user });
    } catch (error) {
        console.error("Error in user login:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


module.exports = { registerUser, loginUser }