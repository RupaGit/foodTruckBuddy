 // Send the POST request.
 $.ajax("/api/foodTrucks", {
    type: "GET",
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