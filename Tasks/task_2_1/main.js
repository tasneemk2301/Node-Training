var http = require('http');
var fs = require('fs');
var url = require('url');
var {URL} = require('url');

console.log(url.URL)
console.log(URL)
console.log(url.URL===URL)

const port = process.env.port || 9000;

var server = http.createServer(function (req, res) {

    res.writeHead(200, { "Content-Type": "text/html" });

    // console.log(req)
    if (req.method === "GET" && req.url == "/add") {
        
        fs.createReadStream("./public/home.html", "UTF-8").pipe(res);
        fs.createReadStream("./public/footer.html", "UTF-8").pipe(res);
    } else if (req.method === "POST" && req.url == "/add") {
        var body = "";
        req.on("data", function (chunk) {
         body += chunk;
        });

        req.on("end", function () {
            console.log("body: "+body);
            

            const myURL = new URL(`http://localhost:${port}/add?${body}`);

            // urlSearchParams.get(name)
            let n1 = +myURL.searchParams.get("number1")||0;
            let n2 = parseInt(myURL.searchParams.get("number2")||0);


            res.write(fs.readFileSync("./public/home.html").toString());
            res.write(`<h1>Result is: <mark>${n1+n2}</mark></h1>`);
            res.end(fs.readFileSync("./public/footer.html").toString());

            // res.write("ksdfhs");
        });
    } else {
        res.end("This is error")
    }
})

server.listen(port, () => {
    console.log("App is running at " + port)
});