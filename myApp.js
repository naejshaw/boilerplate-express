require('dotenv').config()
var bodyParser = require('body-parser')
let express = require('express');
let app = express();

console.log("Hello World")

app.use("/", function middleware(req, res, next){
    let string = req.method + " " + req.path + " - " + req.ip
    console.log(string)
    next()
})
app.use("/public", express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
  });

app.get("/json", (req, res)=> {
    process.env.MESSAGE_STYLE == "uppercase" ?
    res.json({
        message: "Hello json".toUpperCase()
    }) :
    res.json({
        message: "Hello json"
    })
})

app.get("/now", (req, res, next)=>{
    req.time = new Date().toString()
    next()
},(req, res)=> {
    res.send({
        time: req.time
    })
})

app.get("/:word/echo", (req, res)=> {
    const { word } = req.params;
    res.json({
        echo: word
    })
})

app.get("/name", (req, res)=> {
    var { first: firstName, last: lastName } = req.query;
    res.json({
        name: `${firstName} ${lastName}`
    })
})

app.post("/name", (req, res)=>{
    var string = req.body.first + " " + req.body.last;
    res.json({ name: string });
})





























 module.exports = app;
