

$("#savedmoviesbtnid").on("click", function() {

    console.log("Dennissasaasa")
    window.location = "/saved.html";

  });

$("#scrapebtnid").on("click", function() {
    createBlog();
  });

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


