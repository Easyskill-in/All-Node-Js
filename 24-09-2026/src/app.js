const express = require("express")
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
    console.log("Hello From Middleware")
    next();
})

app.use((req, res, next) => {
    console.log("Hello From Middleware1")
    next();
})

app.use((req, res, next) => {
    console.log("Hello From Middleware2")
    next();
})


function about(req, res, next) {
    console.log("About Middleware...")
    next()
}

// app.use(about)


// function middleware(req, res, next) {
//     console.log("Hello From Middleware")
//     // res.send("Hello From Middleware")

//     next();
// }


// app.use(middleware)

app.get("/", (req, res) => {
    console.log("Hello From " + req.url)
    res.json({

        key: "value"
    })
})

app.get("/submit", (req, res) => {
    console.log("Hello From " + req.url)
    res.json({

        key: "value"
    })
})

app.get("/about", about, (req, res) => {
    console.log("Hello From " + req.url)
    res.json({

        key: "about"
    })
})



// app.post("/", (req, res) => {
//     const data = req.body;

//     res.json({
//         key: "value",
//         data
//     })
// })


// app.post("/submit", (req, res) => {
//     console.log("body : ", req.body)
//     console.log("params : ", req.params)
//     console.log("query : ", req.query)
// })

// app.get("/submit", (req, res) => {
//     console.log("body : ", req.body)
//     console.log("params : ", req.params)
//     console.log("query : ", req.query)
// })

module.exports = app;