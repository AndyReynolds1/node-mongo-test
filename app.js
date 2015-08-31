var PORT = process.env.PORT;
var IP = process.env.IP;

var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");

var db;

if(process.env.ENV == "Test")
    db = mongoose.connect("mongodb://" + IP + "/bookAPI_test");
else{
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
    console.log("Running on port: " + PORT);
    console.log("ip: " + process.env.IP);
});

module.exports = app;