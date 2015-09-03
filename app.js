var PORT = process.env.PORT | 3000;
var IP = process.env.IP ? process.env.IP : "localhost";

var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");

var db;
if (process.env.ENV == "Test")
    db = mongoose.connect("mongodb://" + IP + "/bookAPI_test");
else {
    db = mongoose.connect("mongodb://" + IP + "/bookAPI");
}


var Book = require("./models/bookModel");

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

bookRouter = require("./Routes/bookRoutes")(Book);

app.use("/api/books", bookRouter);

app.get("/", function(req, res) {
    res.send("Welcome to my API!");
});

app.listen(PORT, function() {
    console.log("IP set to: " + IP);
    console.log("Running on port: " + PORT);
});

module.exports = app;