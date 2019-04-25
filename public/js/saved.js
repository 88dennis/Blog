
document.addEventListener("DOMContentLoaded", () => {
    savedBlogs();
});




function savedBlogs() {
    $("#savedblogs2").empty();

    $.getJSON("/savedMovies", function(data) {
      for (let i = 0; i < data.length; i++) {
        
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


//  addnotebtn.on("click", function() {
//      $("#notesmodalid").show();
//   // Grab the element
//   var selected = $(this);
//   // Make an ajax call to find the note
//   // This uses the data-id of the p-tag, which is linked to the specific note
//   $.ajax({
//     type: "GET",
//     url: "/find/" + selected.attr("data-id"),
//     success: function(data) {
//       $("#notesmodalid").prepend(notesdivmodal);

// var notesdivmodal = $("<div>");
// notesdivmodal.attr("class", "notesdivmodal")

// var labelpar = $("<p>");
// labelpar.text("NOTES");
// labelpar.attr("class", "labelpar");
// notesdivmodal.append(labelpar)

// var inputfield = $("<input>");
// inputfield.attr("type", "input");
// inputfield.attr("class", "inputfield");
// notesdivmodal.append(inputfield)

// var submitnotebtn = $("<button>");
//     submitnotebtn.attr("class", "submitnotebtn");
//     submitnotebtn.text("ADDNOTES");
//     submitnotebtn.attr("data-id", data[i]._id);

//     notesdivmodal.append(submitnotebtn);

//     }
//   });
// });




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

$("#notesmodalid").prepend(notesdivmodal);

var labelpar = $("<p>");
labelpar.text("NOTES");
labelpar.attr("class", "labelpar");
notesdivmodal.prepend(labelpar)

var inputfield = $("<input>");
inputfield.attr("type", "input");
inputfield.attr("class", "inputfield");
notesdivmodal.append(inputfield)

var submitnotebtn = $("<button>");
        submitnotebtn.attr("class", "submitnotebtn");
        submitnotebtn.text("ADD NOTES");
        submitnotebtn.attr("data-id", data._id);

        notesdivmodal.append(submitnotebtn);

        var closenotebtn = $("<button>");
        closenotebtn.attr("class", "closenotebtn");
        closenotebtn.text("CLOSENOTES");
        closenotebtn.attr("data-id", data._id);

        notesdivmodal.append(closenotebtn);

        closenotebtn.on("click", function() {
    console.log("dendededede")
  window.location = "/saved.html";
  });

        
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


