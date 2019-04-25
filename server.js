var express = require("express");
var exhbs = require("express-handlebars");
var mongojs = require("mongojs");
var axios = require("axios");
var cheerio = require("cheerio");
var logger = require("morgan");
var path = require("path");

var app = express();

var PORT = process.env.PORT || 4000;

var databaseURL = process.env.MONGODB_URI || "moviesblogdb";
var collections = ["scrapedMovies"];

var db = mongojs(databaseURL, collections);
db.on("error", function(error){
    console.log("database error:", error);
});



// Configure our app for morgan and body parsing with express.json and express.urlEncoded
app.use(logger("dev"));
//ACCESS THE PUBLIC FOLDER
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// require("./routes/apiRoutes.js")(app);
// require("./routes/htmlRoutes.js")(app);

// APIS
app.get("/savedMovies", function(req, res) {
  // Go into the mongo collection, and find all docs where "read" is true
  db.scrapedMovies.find({ saved: true }, function(error, found) {
    // Show any errors
    if (error) {
      console.log(error);
    }
    else {
      // Otherwise, send the books we found to the browser as a json
      res.json(found);      
    }
  });
});


// First, tell the console what server.js is doing
// Making a request via axios for reddit's "webdev" board. The page's HTML is passed as the callback's third argument
// Retrieve data from the db

// app.get("/all", function(req, res) {
//     // Find all results from the scrapedMovies collection in the db
   
//   });
  

  // Scrape data from one site and place it into the mongodb db
  app.get("/scrape", function(req, res) {
    // Make a request via axios for the news section of `ycombinator`
    
    // db.scrapedMovies.remove({}, function(error, response) {
    //   // Log any errors to the console
    //   if (error) {
    //     console.log(error);
    //     res.send(error);
    //   }
    //   else {
    //     // Otherwise, send the mongojs response to the browser
    //     // This will fire off the success function of the ajax request
    //     console.log(response);
    //     // res.send(response);
    //   }
    // });

    //SCRAPING A WEBSITE
//-----------------------------------------------------------------------------------------------
    axios.get("http://www.themovieblog.com/").then(function(response) {
      // Load the html body from axios into cheerio
      var $ = cheerio.load(response.data);
      // For each element with a "title" class
      $("h2.genpost-entry-title").each(function(i, element) {
  
        // Save the text and href of each link enclosed in the current element
        var title = $(element).children("a").text();
        var link = $(element).children("a").attr("href");
  
        // If this found element had both a title and a link
        if (title && link) {
          // Insert the data in the scrapedData db
          db.scrapedMovies.insert({
            title: title, 
            link: link,
            saved: false,
            note: ""
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

// Mark a book as having been read
app.put("/savemovieblog/:id", function(req, res) {
  // console.log("DENNISMSARMIENTO");
  // console.log(req.body);

  db.scrapedMovies.update(
    {
      _id: mongojs.ObjectId(req.params.id)
    },
    {
      $set: {
        saved: true
      }
    },
   
    function(error, edited) {
      // show any errors
      if (error) {
        console.log(error);
        res.send(error);
      }
      else {
        // Otherwise, send the result of our update to the browser
        console.log(edited);
        console.log("this id")
        console.log(req.params.id)
        res.send(edited);
      }
    }
  );
});


app.get("/deleteblog/:id", function(req, res) {
  // Remove a note using the objectID
  db.scrapedMovies.remove(
    {
      _id: mongojs.ObjectID(req.params.id)
    },
    function(error, removed) {
      // Log any errors from mongojs
      if (error) {
        console.log(error);
        res.send(error);
      }
      else {
        // Otherwise, send the mongojs response to the browser
        // This will fire off the success function of the ajax request
        console.log(removed);
        res.send(removed);
      }
    }
  );
});


app.get("/find/:id", function(req, res) {
  // When searching by an id, the id needs to be passed in
  // as (mongojs.ObjectId(IdYouWantToFind))

  // Find just one result in the notes collection
  db.scrapedMovies.findOne(
    {
      // Using the id in the url
      _id: mongojs.ObjectId(req.params.id)
    },
    function(error, found) {
      // log any errors
      if (error) {
        console.log(error);
        res.send(error);
      }
      else {
        // Otherwise, send the note to the browser
        // This will fire off the success function of the ajax request
        console.log("DENFOUND");
        console.log(found);

        res.send(found);
      }
    }
  );
});


app.post("/update/:id", function(req, res) {
  // When searching by an id, the id needs to be passed in
  // as (mongojs.ObjectId(IdYouWantToFind))

  // Update the note that matches the object id
  db.scrapedMovies.update(
    {
      _id: mongojs.ObjectId(req.params.id)
    },
    {
      // Set the title, note and modified parameters
      // sent in the req body.
      $set: {
        note: req.body.note,
      }
    },
    function(error, edited) {
      // Log any errors from mongojs
      if (error) {
        console.log(error);
        res.send(error);
      }
      else {
        // Otherwise, send the mongojs response to the browser
        // This will fire off the success function of the ajax request
        console.log(edited);
        res.send(edited);
      }
    }
  );
});

// app.get("/read", function(req, res) {
//   // Go into the mongo collection, and find all docs where "read" is true
//   db.books.find({ read: true }, function(error, found) {
//     // Show any errors
//     if (error) {
//       console.log(error);
//     }
//     else {
//       // Otherwise, send the books we found to the browser as a json
//       res.json(found);
//     }
//   });

//---------------------------------------------------------------------------------------------------------------


app.listen(PORT, function() {
    console.log("Server listening on: http://localhost:" + PORT);
  });

