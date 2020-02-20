
  

    $("#submitTruck").on("click", function (event) {
      // Make sure to preventDefault on a submit event.
      event.preventDefault();
  
  
      // displayGif("https://gph.is/1Oua2mK");
      var newTruck = {
        truckName: $("#foodTruckName").val().trim(),
        cusine: $("#cusine").val().trim(),
        twitterHandle: $("#twitterHandle").val().trim(),
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

  