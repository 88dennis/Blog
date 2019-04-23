var express = require("express");
var exhbs = require("express-handlebars");
var mongojs = require("mongojs");
var axios = require("axios");
var cheerio = require("cheerio");

var app = express();

var PORT = process.env.PORT || 3000;

var databaseURL = "moviesblogdb";
var collections = ["scrapedMovies"];

var db = mongojs(databaseURL, collections);
db.on("error", function(error){
    console.log("database error:", error);
});

// app.use(express.static("public"));
// require("./routes/apiRoutes.js")(app);
// require("./routes/htmlRoutes.js")(app);

app.get("/", function(req, res){
res.send("Hello World")
})


// First, tell the console what server.js is doing
// Making a request via axios for reddit's "webdev" board. The page's HTML is passed as the callback's third argument
// Retrieve data from the db
app.get("/all", function(req, res) {
    // Find all results from the scrapedMovies collection in the db
    db.scrapedMovies.find({}, function(error, found) {
      // Throw any errors to the console
      if (error) {
        console.log(error);
      }
      // If there are no errors, send the data to the browser as json
      else {
        res.json(found);
      }
    });
  });
  
  // Scrape data from one site and place it into the mongodb db
  app.get("/movies", function(req, res) {
    // Make a request via axios for the news section of `ycombinator`

    //SCRAPING A WEBSITE
//-----------------------------------------------------------------------------------------------
    axios.get("https://www.imdb.com/").then(function(response) {
      // Load the html body from axios into cheerio
      var $ = cheerio.load(response.data);
      // For each element with a "title" class
      $("p.blurb").each(function(i, element) {
  
        // Save the text and href of each link enclosed in the current element
        var title = $(element).children("a").text();
        var link = $(element).children("a").attr("href");
  
        // If this found element had both a title and a link
        if (title && link) {
          // Insert the data in the scrapedData db
          db.scrapedMovies.insert({
            title: title,
            link: link
          },
          function(err, inserted) {
            if (err) {
              // Log the error if one is encountered during the query
              console.log(err);
            }
            else {
              // Otherwise, log the inserted data
              console.log(inserted);
            }
          });
        }
      });
    });
  
    // Send a "Scrape Complete" message to the browser
    res.send("Scrape Complete");
  });
  
//---------------------------------------------------------------------------------------------------------------


app.listen(PORT, function() {
    console.log("Server listening on: http://localhost:" + PORT);
  });

