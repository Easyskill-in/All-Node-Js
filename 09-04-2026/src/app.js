const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function Middleware(req, res, next) {
    console.log("Hello From Middleware", req.body)
    req.body["username"] = "Easyskill";
    // req.body.username = "Easyskill";
    req.body.x = "YZ"
    req.user = "USERNAME"
    next()
}
function Middleware1(req, res, next) {
    console.log("Hello From Middleware1", req.body)
    next()
}
function Middleware2(req, res, next) {
    console.log("Hello From Middleware2", req.body)
    next()
}
function Middleware3(req, res, next) {
    console.log("Hello From Middleware3", req.body)
    next()
}
function Middleware4(req, res, next) {
    console.log("Hello From Middleware4")
    next()
}

app.use(Middleware)
app.use(Middleware1)
app.use("/users", Middleware4)

app.get('/', (req, res) => {
    console.log("Hello From Default Route")
    res.send('Hello World!');
}
);
app.get('/about', (req, res) => {
    console.log("Hello From About Route", req.body, req.user)
    res.send('About World!');
}
);
app.get('/Home', Middleware2, (req, res) => {
    console.log("Hello From Home Route", req.body, req.user)
    res.send('Home World!');
}
);
app.get('/Product', Middleware2, Middleware3, (req, res) => {
    console.log("Hello From Home Route", req.body, req.user)
    res.send('Home World!');
});

module.exports = app;
