require("dotenv").config();

module.exports = {
    PORT: process.env.PORT || 3000,
    PASS: process.env.PASS || 'defaultpassword',
    EMAIL: process.env.EMAIL || 'example@example.com'
}