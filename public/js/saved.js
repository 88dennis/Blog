
document.addEventListener("DOMContentLoaded", () => {
    savedBlogs();
});

function savedBlogs() {
    $("#savedblogs2").empty();

    $.getJSON("/savedMovies", function(data) {
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
//----------------------------------------
        var deletebtn = $("<button>");
        deletebtn.attr("class", "deletebtn");
        deletebtn.text("DELETE");
        deletebtn.attr("data-id", data[i]._id);
        savedtruewrap.append(deletebtn);


        deletebtn.on("click", function() {
          console.log("DENNISSARMS")
          var thisId = $(this).attr("data-id");
          $.ajax({
            type: "GET",
            url: "/deleteblog/" + thisId

          });

  var deleteblogitem = $(this).parents("div.savedtruewrap");
          deleteblogitem.remove();
          
        //   $(".tbody").prepend(savedblogitem);

        });

        //------------------------------


 var addnotebtn = $("<button>");
        addnotebtn.attr("class", "addnotebtn");
        addnotebtn.text("ADD NOTES");
        addnotebtn.attr("data-id", data[i]._id);
        savedtruewrap.append(addnotebtn);


        addnotebtn.on("click", function() {
          console.log("DENNISSARMS")
          var thisId = $(this).attr("data-id");
          $.ajax({
            type: "GET",
            url: "/addnotes/" + thisId

          });

          

//   var deleteblogitem = $(this).parents("div.savedtruewrap");
//           deleteblogitem.remove();
          
        //   $(".tbody").prepend(savedblogitem);

        });


      }
      // $("#read").prepend("<tr><th>Title</th><th>Author</th><th>Read/Unread</th></tr>");
    });
  }