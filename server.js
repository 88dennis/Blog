var express = require("express");
var mongojs = require("mongojs");
var axios = require("axios");
var cheerio = require("cheerio");

var app = express();

var PORT = process.env.PORT || 3000;

var databaseURL = "scraper";
var collections = ["scrapedData"];

var db = mongojs(databaseURL, collections);
db.on("error", function(error){
    console.log("database error:", error);

});

app.get("/", function(req, res){

    
res.send("Hello World")

})



app.listen(PORT, function() {
    console.log("Server listening on: http://localhost:" + PORT);
  });

