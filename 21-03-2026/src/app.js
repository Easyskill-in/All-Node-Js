const express = require("express")

const app = express()


app.get("/", (req, res) => {
    res.json(JSON.stringify({
        name: "Username",
        method: req.method,
        data: req.body || 101
    }))
});

app.listen(3000, () => {
    console.log("server is running on port 3000");
})