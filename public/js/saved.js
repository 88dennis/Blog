
document.addEventListener("DOMContentLoaded", () => {
    savedBlogs();

});

$("#homebtnid2").on("click", function() {

  console.log("Dennissasaasa")
  window.location = "/index.html";

});

function savedBlogs() {
    $("#savedblogs2").empty();

    $.getJSON("/savedMovies", function(data) {
      for (let i = 0; i < data.length; i++) {
        
        var savedtruewrap = $("<div>");
        savedtruewrap.attr("class", "savedtruewrap");
        $("#savedblogs2").prepend(savedtruewrap);
        
        var titleDiv2 = $("<div>");
        titleDiv2.attr("class", "titleDiv2")
        
        savedtruewrap.prepend(titleDiv2);

        var titleP2 = $("<div>");
        titleP2.attr("class", "titleP2")
        titleP2.prepend(data[i].title);
        titleDiv2.prepend(titleP2);

        var linkDiv2 = $("<div>");
        linkDiv2.attr("class", "linkDiv2")
        
        savedtruewrap.append(linkDiv2);

        var anchorlink2 = $("<a>");
        anchorlink2.attr("href", data[i].link)
        anchorlink2.text("Click Me!");
        linkDiv2.append(anchorlink2);
//----------------------------------------
        var deletebtn = $("<button>");
        deletebtn.attr("class", "deletebtn");
        deletebtn.text("delete");
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
        addnotebtn.text("add notes");
        addnotebtn.attr("data-id", data[i]._id);
        savedtruewrap.append(addnotebtn);

addnotebtn.on("click", function() {
  $("#notesmodalid").show()
  
        var selected = $(this);
        // Make an ajax call to find the note
        // This uses the data-id of the p-tag, which is linked to the specific note
        $.ajax({
            type: "GET",
            url: "/find/" + selected.attr("data-id"),
            success: function(data) {
                

        console.log("DENnnnnn");
        console.log(data);

        var notesdivmodal = $("<div>");
        notesdivmodal.attr("class", "notesdivmodal")

        $("#notesmodalid").append(notesdivmodal);

        var labelpar = $("<p>");
        labelpar.text("NOTES FOR: " + data._id);
        labelpar.attr("class", "labelpar");
        notesdivmodal.prepend(labelpar);

var notesaveddiv = $("<div>");
        
        notesaveddiv.attr("class", "notesaveddiv");
        notesdivmodal.append(notesaveddiv);
notesaveddiv.text(data.note);
        var inputfield = $("<input>");
        inputfield.attr("type", "input");
        inputfield.attr("class", "inputfield");
        notesdivmodal.append(inputfield);
        var buttodsubclosediv = $("<div>");
        buttodsubclosediv.attr("class", "buttodsubclosediv");
        notesdivmodal.append(buttodsubclosediv);

        var submitnotebtn = $("<button>");
        submitnotebtn.attr("class", "submitnotebtn");
        submitnotebtn.text("Send New Comment");
        submitnotebtn.attr("data-id", data._id);
        buttodsubclosediv.append(submitnotebtn);

        var closenotebtn = $("<button>");
        closenotebtn.attr("class", "closenotebtn");
        closenotebtn.text("close");
        closenotebtn.attr("data-id", data._id);
        buttodsubclosediv.append(closenotebtn);

closenotebtn.on("click", function() {
    console.log("dendededede")
  window.location = "/saved.html";
  });
//----------------------------------
submitnotebtn.on("click", function() {
  
  $.ajax({
    type: "POST",
    url: "/update/" + selected.attr("data-id"),
    dataType: "json",
    data: {
      note: $(".inputfield").val()
    },
    // On successful call
    success: function(data) {


      // Clear the inputs
      $(".inputfield").val("");
    //   $("#title").val("");
    //   // Revert action button to submit
    //   $("#action-button").html("<button id='make-new'>Submit</button>");
    //   // Grab the results from the db again, to populate the DOM
    //   getResults();


  // Make an AJAX GET request to delete the notes from the db
  $.ajax({
    type: "GET",
    url: "/find/" + selected.attr("data-id"),
    // On a successful call, clear the #results section
    success: function(data) {

notesaveddiv.text("Comment: " + data.note);


    
    }
  });


    
    }
  });
});
//----------------------------------------

        
    }
  });



});




//         addnotebtn.on("click", function() {
//             // $("#notesmodalid").show()
//           console.log("DENNISSARMS")
//           var thisId = $(this).attr("data-id");
//           $.ajax({
//             type: "GET",
//             url: "/find/" + thisId
//           })




// //   var deleteblogitem = $(this).parents("div.savedtruewrap");
// //           deleteblogitem.remove();
          
//         //   $(".tbody").prepend(savedblogitem);

//         });
//----------------------------------------------------------------------------------

      }
      // $("#read").prepend("<tr><th>Title</th><th>Author</th><th>Read/Unread</th></tr>");
    });


  }


