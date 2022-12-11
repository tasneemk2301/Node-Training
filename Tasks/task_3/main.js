const express = require('express');
const port = process.env.NODE_PORT || 3000;

const server = express();

server.set('views', __dirname + '/view'); // defaul is views
server.set("view engine", "ejs");

// server.use(function(req, res, next){
//     let payload = "";
//     req.on("data", function(chunk){
//         payload += chunk;
//     })
//     req.on("end", function(){
//         req.body = payload;
//         next();
//     })
// })

// var bodyParser = require('body-parser')
// server.use(bodyParser.urlencoded({ extended: true }));
// server.use(bodyParser.json());

server.use(express.urlencoded({ extended: true }));
server.use(express.json());

let items= [{Item:"Book", Price:"550"}, {Item:"Necklace", Price:"725"}, {Item:"Mobile", Price:"17000"}];

server.get("/login", (req, res)=>{
    res.render("login", {errorMessage: ""});
});

server.post("/login", (req, res)=>{
    console.log("in post, doing login")
    console.log(req.body)
    if(!!req.body.user && req.body.user===req.body.pass){
        res.render("welcome", {username: req.body.user, results: items })
    } else {
        res.render("login", {errorMessage: "Something bad happenned"});
    }
    
});

server.post("/welcome", (req, res)=>{
    console.log(req.body)
    let date= new Date().toLocaleDateString();
    res.render("invoice", {Username: req.body.Username, Item: req.body.Item, Price: req.body.Price, Date: date})
});






server.listen(port, function(){
    console.log("App is running at: "+port);
})