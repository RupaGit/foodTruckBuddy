
$(document).ready(function () {
  $("#nav-placeholder").load("nav.html");

  function getUserData() {
    console.log("I am called");
    $.ajax("/api/user_data", {
      type: "GET"
    }).then(
      function (res) {
        return res.id;
        console.log(res.id);
      });
  }

  $("#submitTruck").on("click", function (event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();
    var url = document.location.href,
      params = url.split('?')[1].split('&'),
      data = {}, tmp;
    for (var i = 0, l = params.length; i < l; i++) {
      tmp = params[i].split('=');
      data[tmp[0]] = tmp[1];
    }
    var userId = parseInt(data.userId);
    console.log(userId);


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
  });


