$(document).ready(function() {
    $("#nav-placeholder").load("nav.html");
    $("#submitTruck").on("click", function (event) {
      // Make sure to preventDefault on a submit event.
      event.preventDefault();
  
  
      var newTruck = {
        truckName: $("#foodTruckName").val().trim(),
        twitterHandle: $("#twitterHandle").val().trim(),
        cuisine: $("#cusine").val().trim(),
        description: $("#description").val().trim() 
      };
      console.log(newTruck)
  
      // Send the POST request.
      $.ajax("/api/foodTrucks", {
        type: "POST",
        data: newTruck
      }).then(
        function() {
          data();
          console.log("created new Truck");
        });
      });
         

  //Send PUT Request

  $("#editTruck").on("click", function(){
    var updatedTruck = {
      truckName: $("#foodTruckName").val().trim(),
        twitterHandle: $("#twitterHandle").val().trim(),
        cuisine: $("#cusine").val().trim(),
        description: $("#description").val().trim()

    }
    $.ajax("/api/foodTrucks", {
      type: "PUT",
      data: updatedTruck
     }).then(
       function(err,data){
         data();
         console.log("Edited food truck name");
       }
     )
  

  })

  


 

          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
  });