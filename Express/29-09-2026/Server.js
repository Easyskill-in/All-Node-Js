const http = require("http")
const { WriteData, ReadData } = require("./database/Functions")


const app = http.createServer((req, res) => {


    if (req.url === "/favicon.ico") {
        return;
    }

    WriteData({
        URL: req.url,
        METHOD: req.method,
        Date: new Date().toDateString(),
        Time: new Date().toTimeString(),
    })

    res.writeHead(200, {
        'Content-Type': 'application/json'
    });

    res.end(JSON.stringify(ReadData(), null, 2))

})



app.listen(3000, () => {
    console.log("Server is Running on PORT 3000")
})




// 200
// 201
// 400
// 401
// 403
// 404
// 500
// 503