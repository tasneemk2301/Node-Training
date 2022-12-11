const express = require('express');
const itemsRoutes = require("./routes/items");

const port = process.env.NODE_PORT || 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"))

app.use("/items", itemsRoutes)

app.listen(port, function(){
    console.log("App is running at: "+port);
})