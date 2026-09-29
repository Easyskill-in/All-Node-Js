const app = require("./app");
const { PORT } = require("./Config/Config.js");



app.listen(PORT, () => {
    console.log(`Server is Running on http://localhost:${PORT}`)
})