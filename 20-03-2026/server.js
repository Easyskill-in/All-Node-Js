const http = require("http")

const app = http.createServer((req, res) => {

    if (req.url === "/favicon.ico") { return }

    console.log(req.socket.remoteAddress)
    console.log(req.url)
    console.log("Ok! " + req.method)
    switch (req.url) {
        case '/':
            console.log("Default Route")
            res.end("Hi")
            break;
        case '/about':
            res.end("About Route")
            break;
        case '/product':
            res.end("Product Route")
            break;

        default:
            res.end("404 Route")
            break;
    }
})

app.listen(3000, () => {
    console.log("Server is Running on PORT 3000")
})