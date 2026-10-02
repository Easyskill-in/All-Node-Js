const app = require(".");
const { PORT } = require("./Config/env");


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});