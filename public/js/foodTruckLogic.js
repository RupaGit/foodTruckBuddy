$(document).ready(function () {
  $("#nav-placeholder").load("nav.html");
  //get user ID if the user is logged in
  var userId;
  $.ajax("/api/user_data", {
    type: "GET"
  }).then(
    function (res) {
      userId = res.id;
      console.log(res.id);
      //Validate if there is a food truck created for user
      $.ajax("/api/foodTrucks/" + userId, {
        type: "GET"
      }).then(
        function (res) {
          if (res) {
            $("#AddTruckText").html("You already have a truck added. You can only manage or add location to that truck");
            $("#addTruckLink").hide();
          }
        });
    });

  $("#submitTruck").on("click", function (event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();
    var truckRating;
    var truckName = $("#foodTruckName").val().split(" ");
    truckName = truckName.join("-");
    console.log(truckName);
    // Constructing a queryURL using the address captured from the Address input field in the HTML
    var yelpQuery = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/" + truckName + "-new-york"
    var apiKey = "Bearer vONi09eF3JBM_C8djFa4wUnLta0Zmk331AT-PQ2-FNCFRND6BEeVZ5xtOCVeCvQViRhvegq23ZliF4kmyYTgSZNZ4gGBqICgX5KUdledrIBOpuu_uq5s1xs94XdUXnYx"
    $.ajax({
      url: yelpQuery,
      method: "GET",
      headers: {
        Authorization: apiKey
      }
    }).then(function (response, error) {

      truckRating = response.rating;

      // console.log response;
      var newTruck = {
        truckName: $("#foodTruckName").val().trim(),
        twitterHandle: $("#twitterHandle").val().trim(),
        cuisine: $("#cusine").val().trim(),
        description: $("#description").val().trim(),
        rating: truckRating,
        userId: userId
      };
      console.log(newTruck)
      // Send the POST request.
      $.ajax("/api/foodTrucks", {
        type: "POST",
        data: newTruck
      }).then(
        function () {
          // data();
          // console.log("created new Truck");
          var url = '/userDashboard.html?userId=' + encodeURIComponent(userId);
          document.location.href = url;
          $("#foodTruckDashboard").prepend("<h4>Your truck added successfully<h4>");
        });
    });
  });

  //Display truck details
  $("#manageTruck").on("click", function () {
    console.log("I am here");
    $.ajax("/api/user_data", {
      type: "GET"
    }).then(
      function (res) {
        $.ajax("/api/foodTrucks/" + res.id, {
          type: "GET"
        }).then(
          function (truckData) {
            $("#editFoodTruckName").val(truckData.truckName);
            $("#editCusine").val(truckData.cuisine);
            $("#editTwitterHandle").val(truckData.twitterHandle);
            $("#editDescription").val(truckData.description);
          });
      });
  });

  //Send PUT Request to update truck
  $("#saveTruck").on("click", function () {
    event.preventDefault();
    var updatedTruck = {
      truckName: $("#editFoodTruckName").val().trim(),
      twitterHandle: $("#editTwitterHandle").val().trim(),
      cuisine: $("#editCusine").val().trim(),
      description: $("#editDescription").val().trim()
    }
    console.log(updatedTruck);
    $.ajax("/api/foodTrucks/"+userId, {
      type: "PUT",
      data: updatedTruck
    }).then(function (err, data) {
      console.log("Edited food truck name");
    });
  });

  //Adding truck location
  $("#saveLocation").on("click", function () {
    event.preventDefault();
    var truckId;
    var truckLocation = $("#editStreetAddress").val().trim() + ", " + $("#editCity").val().trim() + ", " + $("#editState").val().trim() + ", " + $("#editZipCode").val().trim();
    var streetAddress = $("#editStreetAddress").val().trim().split(" ");
    streetAddress = streetAddress.join("+");
    var city = $("#editCity").val().trim().split(" ");
    city = city.join("+");
    var state = $("#editState").val().trim().split(" ");
    state = state.join("+")

    address = streetAddress + "+" + city + "+" + state + "+" + $("#editZipCode").val().trim();
    console.log(address);

    // Constructing a queryURL using the address captured from the Address input field in the HTML
    var queryURL = "http://open.mapquestapi.com/geocoding/v1/address?key=DTPAAe2yk5mwUTAE1WcLA2uR5qZ7t5iE&location=" +
      address;

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // After data comes back from the request
      .then(function (response) {
        console.log(queryURL);

        //   console.log(response);
        // storing the data from the AJAX request in the latLng variable
        var latlong = response.results[0].locations[0].latLng;

        $.ajax("/api/user_data", {
          type: "GET"
        }).then(
          function (res) {
            $.ajax("/api/foodTrucks/" + res.id, {
              type: "GET"
            }).then(
              function (truckData) {
                console.log(truckData);
                truckId = truckData.id;
                console.log("Truck ID from AJAX is ", truckId);
                var locationDetails = {
                  location: truckLocation,
                  FoodTruckId: truckId,
                  latitude: latlong.lat,
                  longitude: latlong.lng
                }
                console.log(locationDetails);
                $.ajax("/api/foodTruckLocations" , {
                  type: "POST",
                  data: locationDetails
                }).then(function (err, data) {
                  console.log("Food Truck Location");
                });
              });

          });
      });
  });
});
