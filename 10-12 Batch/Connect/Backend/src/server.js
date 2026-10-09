// const dotenv = require("dotenv")
// dotenv.config()

const app = require("./app");
const { PORT } = require("./Config/Config");

// require("dotenv").config()



// console.log(process.env.PORT)
// console.log(process.env.DATABASE_NAME)


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});