
// function displayResults(scrapedMovies) {
//     // First, empty the table
//     $(".tbody").empty();
  
//     // Then, for each entry of that json...
//     scrapedMovies.forEach(function(movie) {
//       // Append each of the animal's properties to the table
//       var tr = $("<div>").prepend(
//         $("<p>").text(movie.title),
//         $("<p>").text(movie.link),
//       );
//       $(".tbody").prepend(tr);
//     });
//   }


$("#savedmoviesbtnid").on("click", function() {

    console.log("Dennissasaasa")
savedBlogs()

  });

$("#scrapebtnid").on("click", function() {


    createBlog();
  });

  
  

  // $(".saveblogbtn").on("click", function() {
  //   console.log("DENNISSARMS")
  //   // var thisId = $(this).attr("data-id");
  //   // $.ajax({
  //   //   type: "PUT",
  //   //   url: "/savemovieblog/" + thisId
  //   // });
  //   // $(this).parents("div.savedDivwrap").remove();


  // });

  // function saveThis() {
  //   $(".tbody").empty();
  //   $.getJSON("/", function(data) {
  //     for (var i = 0; i < data.length; i++) {
  //       var savedDivwrap = $("<div>");
  //       savedDivwrap.attr("class", "savedDivwrap");
  //       $("#savedblogs").prepend(savedDivwrap);
        
  //       var titleDiv = $("<div>");
  //       titleDiv.attr("class", "titleDiv")
  //       titleDiv.prepend(data[i].title);
  //       savedDivwrap.prepend(titleDiv);

  //       var linkDiv = $("<div>");
  //       linkDiv.attr("class", "linkDiv")
  //       linkDiv.prepend(data[i].link);
  //       savedDivwrap.prepend(linkDiv);

  //       var saveblogbtn = $("<button>");
  //       saveblogbtn.attr("class", "saveblogbtn");
  //       saveblogbtn.text("SAVE");
  //       saveblogbtn.attr("data-id", data[i]._id);
  //       savedDivwrap.append(saveblogbtn);



  //       // $("#unread").prepend("<tr><td>" + data[i].title + "</td><td>" + data[i].author +
  //       //   "</td><td><button class='markread' data-id='" + data[i]._id + "'>Mark Read</button></td></tr>");
  //     }
  //     $("#unread").prepend("<tr><th>Title</th><th>Author</th><th>Read/Unread</th></tr>");
  //   });
  // }
  


  function createBlog() {
    $("#savedblogs").empty();

    $.getJSON("/scrape", function(data) {
      for (var i = 0; i < data.length; i++) {
        
        var savedDivwrap = $("<div>");
        savedDivwrap.attr("class", "savedDivwrap");
        $("#savedblogs").prepend(savedDivwrap);
        
        var titleDiv = $("<div>");
        titleDiv.attr("class", "titleDiv")
        titleDiv.prepend(data[i].title);
        savedDivwrap.prepend(titleDiv);

        var linkDiv = $("<div>");
        linkDiv.attr("class", "linkDiv")
        linkDiv.prepend(data[i].link);
        savedDivwrap.prepend(linkDiv);

        var saveblogbtn = $("<button>");
        saveblogbtn.attr("class", "saveblogbtn");
        saveblogbtn.text("SAVE");
        saveblogbtn.attr("data-id", data[i]._id);
        savedDivwrap.append(saveblogbtn);


        saveblogbtn.on("click", function() {
          console.log("DENNISSARMS")
          var thisId = $(this).attr("data-id");
          $.ajax({
            type: "PUT",
            url: "/savemovieblog/" + thisId

          });

  var savedblogitem = $(this).parents("div.savedDivwrap");
          savedblogitem.remove();
          
  //         $(".tbody").prepend(savedblogitem);

        });

      }
      // $("#read").prepend("<tr><th>Title</th><th>Author</th><th>Read/Unread</th></tr>");
    });
  }


function savedBlogs() {
    window.location = "/saved";
    $("#savedblogs2").empty();

    $.getJSON("/saved", function(data) {
      for (var i = 0; i < data.length; i++) {
        
        var savedtruewrap = $("<div>");
        savedtruewrap.attr("class", "savedtruewrap");
        $("#savedblogs2").prepend(savedtruewrap);
        
        var titleDiv2 = $("<div>");
        titleDiv2.attr("class", "titleDiv")
        titleDiv2.prepend(data[i].title);
        savedtruewrap.prepend(titleDiv2);

        var linkDiv2 = $("<div>");
        linkDiv2.attr("class", "linkDiv")
        linkDiv2.prepend(data[i].link);
        savedtruewrap.prepend(linkDiv2);

        var deletebtn = $("<button>");
        deletebtn.attr("class", "deletebtn");
        deletebtn.text("SAVE");
        deletebtn.attr("data-id", data[i]._id);
        savedtruewrap.append(deletebtn);
        window.location.replace("sav.html);


  //       deletebtn.on("click", function() {
  //         console.log("DENNISSARMS")
  //         var thisId = $(this).attr("data-id");
  //         $.ajax({
  //           type: "DELETE",
  //           url: "/deleteblog/" + thisId

  //         });

  // var deleteblogitem = $(this).parents("div.savedtruewrap");
  //         deleteblogitem.remove();
          
  //         $(".tbody").prepend(savedblogitem);

        // });

      }
      // $("#read").prepend("<tr><th>Title</th><th>Author</th><th>Read/Unread</th></tr>");
    });
  }