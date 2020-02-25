$(document).ready(function () {
  $("#nav-placeholder").load("nav.html");
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
        data();
        console.log("created new Truck");
      });
  });


  //Send PUT Request

  $("#editTruck").on("click", function () {
    var updatedTruck = {
      truckName: $("#foodTruckName").val().trim(),
      twitterHandle: $("#twitterHandle").val().trim(),
      cuisine: $("#cusine").val().trim(),
      description: $("#description").val().trim()

    }
    $.ajax("/api/foodTrucks", {
      type: "PUT",
      data: updatedTruck
    }).then(function (err, data) {
      data();
      console.log("Edited food truck name");
    });
  });
});