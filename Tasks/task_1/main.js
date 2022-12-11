const http = require("http");
const fs = require("fs")
const port = process.env.port || 5000;

// const myMod = require("./my-mod");


let server = http.createServer((request, response)=>{

    // console.log("server has got new request");

    response.writeHead(200, "Success", {"Content-Type": "text/html"});

    html= fs.readFileSync("./home.html")

    // read html content

    response.end(html);

})

server.listen(port, ()=>{
    console.log("App is running at "+port)
});