const http = require("http")


const Server = http.createServer((req, res) => {
    // console.log("Hello World")
    // console.log(req)
    console.log("URL : ", req.url)
    console.log("METHOD : ", req.method)
    // console.log(req)

    if (req.url === "/") {
        res.end("Home Page")
    } else if (req.url === "/about") {
        res.end("About Page")
    } else if (req.url === "/product") {
        res.end("Product Page")
    } else {
        res.end("No Page")
    }
})


// console.log(Server)


Server.listen(3000, () => {
    console.log("Server is Running on PORT 3000")
})