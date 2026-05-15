const mongoose = require('mongoose');
const { MONGODB_URL } = require('./Config');



async function connectDB() {
    try {
        const conn = await mongoose.connect(`${MONGODB_URL}`)

        console.log("Database Connected successfully...", conn.connection.host)
        return true
    } catch (error) {

        if (error.name === "MongooseServerSelectionError") {
            console.error("MongoDB Server Selection Error: Unable to connect to database");
        } else {
            console.error("Database connection error:", error.message);
        }

        return false
    }
}


module.exports = connectDB