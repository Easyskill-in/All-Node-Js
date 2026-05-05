const http = require("http")


const app = http.createServer((req, res) => {
    switch (req.url) {
        case '/':

            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({
                name: "Username",
                method: req.method,
                data: req.body || 101
            }))

            break;
        case '/about':
            // res.setHeader('Content-Type', 'application/json');
            res.end("/about Route")

            break;

        case '/product':
            res.end("/product Route")

            break;

        default:
            res.end("404 Route")
            break;
    }
})



app.listen(3000, () => {
    console.log("Server is running on PORT 3000 ")
})