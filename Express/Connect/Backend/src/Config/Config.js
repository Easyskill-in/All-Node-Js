// const dotenv = require("dotenv")

// dotenv.config();


require("dotenv").config()

module.exports = {
    PORT: process.env.PORT,
    HOSTNAME: process.env.HOSTNAME,
    FRONTEND_URL: process.env.FRONTEND_URL
}


// const PORT = process.env.PORT;
// const HOSTNAME = process.env.HOSTNAME;


// module.exports = { PORT, HOSTNAME }