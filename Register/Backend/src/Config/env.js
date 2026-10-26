require("dotenv").config()


module.exports = {
    PORT: process.env.PORT || 1000,
    FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:5173",
    JWT_SECRET: process.env.JWT_SECRET || "my secret",
}