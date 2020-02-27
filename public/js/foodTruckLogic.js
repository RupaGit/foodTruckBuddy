

$(document).ready(function () {
  $("#nav-placeholder").load("nav.html");
  var userId;
    $.ajax("/api/user_data", {
      type: "GET"
    }).then(
      function (res) {
        userId = res.id;
        console.log(res.id);
      });


  $("#submitTruck").on("click", function (event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();
    var truckName = $("#foodTruckName").val().split(" ");
      truckName = truckName.join("-");
      console.log(truckName);
      console.log("I am in ratings");
    
      // Constructing a queryURL using the address captured from the Address input field in the HTML
      var yelpQuery = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/"+truckName+"/reviews"
      var apiKey = "Bearer vONi09eF3JBM_C8djFa4wUnLta0Zmk331AT-PQ2-FNCFRND6BEeVZ5xtOCVeCvQViRhvegq23ZliF4kmyYTgSZNZ4gGBqICgX5KUdledrIBOpuu_uq5s1xs94XdUXnYx"
    
      // $.ajax({
      //     url: yelpQuery,
      //     method: "GET",
      //     headers: {
      //         Authorization: apiKey
      //     }
      // }).then(function (response) {
      //     console.log(response.reviews[0]);
      //     // console.log response;
      // });    

    // var url = document.location.href,
    //   params = url.split('?')[1].split('&'),
    //   data = {}, tmp;
    // for (var i = 0, l = params.length; i < l; i++) {
    //   tmp = params[i].split('=');
    //   data[tmp[0]] = tmp[1];
    // }
    // var userId = parseInt(data.userId);
    // console.log(userId);


    var newTruck = {
      truckName: $("#foodTruckName").val().trim(),
      twitterHandle: $("#twitterHandle").val().trim(),
      cuisine: $("#cusine").val().trim(),
      description: $("#description").val().trim(),
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

  //Send PUT Request

  $("#saveTruck").on("click", function () {
    event.preventDefault();
    var updatedTruck = {
      truckName: $("#editFoodTruckName").val().trim(),
      twitterHandle: $("#editTwitterHandle").val().trim(),
      cuisine: $("#editCusine").val().trim(),
      description: $("#editDescription").val().trim()
    }
    console.log(updatedTruck);
    $.ajax("/api/foodTrucks", {
      type: "PUT",
      data: updatedTruck
    }).then(function (err, data) {
      console.log("Edited food truck name");
    });
  });

  $("#saveLocation").on("click", function () {
    var truckId;
    var truckLocation = $("#editStreetAddress").val().trim() + ", " + $("#editCity").val().trim() + ", " + $("#editState").val().trim() + ", " + $("#editZipCode").val().trim();
    event.preventDefault();
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
              foodTruckId: truckId
            }
            console.log(locationDetails);
            $.ajax("/api/foodTruckLocations/" + truckId, {
              type: "POST",
              data: locationDetails
            }).then(function (err, data) {
              console.log("Food Truck Location");
            });
          });


      });
  });
});

