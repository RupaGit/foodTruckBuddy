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
      console.log(newTruck);
  
      // Send the POST request.
      $.ajax("/api/foodTrucks", {
        type: "POST",
        data: newTruck
      }).then(
        function () {
          console.log("created new Truck");
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
  });

  //Send PUT Request
 $.ajax("/api/foodTrucks", {
    type: "PUT",
    data: newFoodTruckName, newTwitterHandle, newCuisine, newDescription
   }).then(
     function(){
       console.log("Edited food truck");
     }
   )
   

   
