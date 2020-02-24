$(document).ready(function () {
    $("#nav-placeholder").load("nav.html");

    $("#getFoodTrucks").on("click", function (event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();
        console.log("I am here");
        // var foodTrucklog= {
        //     userName: $("#userName").val().trim(),
        //     email: $("#userEmail").val().trim(),
        //     password: $("#userPassword").val().trim()
        // };
        var id = 1;
        // Send the POST request.
        $.ajax("/api/foodTrucks/" + id,
            {
                type: "GET",

            }).then(
                function (data) {
                    console.log(data);
                    var newFoodTruckBody = $("<div>");
                    var newFoodTruckName = $("<p>");
                    console.log(data.name);
                    newFoodTruckName.text(data.truckName);
                    newFoodTruckBody.append(newFoodTruckName);
                    

                    var newTwitterHandle = $("<p>");
                    newTwitterHandle.text(data.twitterHandle);
                    newFoodTruckBody.append(newTwitterHandle);

                    var newCuisine = $("<p>");
                    newCuisine.text(data.cuisine);
                    newFoodTruckBody.append(newCuisine);

                    var newDescription = $("<p>");
                    newDescription.text(data.description);
                    newFoodTruckBody.append(newDescription);

                    $("#foodTruckDetails").append(newFoodTruckBody);
                    
                    // Reload the page to get the updated list
                    // location.reload();
                }
            );
    });
}); 