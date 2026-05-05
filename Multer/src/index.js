const { PORT } = require("../Config/Config");
const app = require("./app");

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} 🚀`);
});