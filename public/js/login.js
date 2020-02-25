$(document).ready(function () {
    $("#nav-placeholder").load("nav.html");

    $("#login").on("click", function(event){
        event.preventDefault();
       
        console.log("I am here");

        var user = {
            email: $("#email").val().trim(),
            password: $("#password").val().trim()
        };
        console.log(user);
        // Send the POST request.
        $.ajax("/api/login", {
            type: "POST",
            data: user
        }).then(
            function (data) {
                console.log("logged in successfully");
                console.log("The data returned to ajax is ",data);
                var url = '/userDashboard.html?userId=' + encodeURIComponent(data);
                document.location.href = url;
            }
        );
    });

    // $("#getFoodTrucks").on("click", function (event) {
    //     // Make sure to preventDefault on a submit event.
    //     event.preventDefault();
    //     console.log("I am here");
    //     // var foodTrucklog= {
    //     //     userName: $("#userName").val().trim(),
    //     //     email: $("#userEmail").val().trim(),
    //     //     password: $("#userPassword").val().trim()
    //     // };
    //     var id = 1;
    //     // Send the POST request.
    //     $.ajax("/api/foodTrucks/" + id,
    //         {
    //             type: "GET",

    //         }).then(
    //             function (data) {
    //                 console.log(data);
    //                 var newFoodTruckBody = $("<div>");
    //                 var newFoodTruckName = $("<p>");
    //                 console.log(data.name);
    //                 newFoodTruckName.text(data.truckName);
    //                 newFoodTruckBody.append(newFoodTruckName);
                    

    //                 var newTwitterHandle = $("<p>");
    //                 newTwitterHandle.text(data.twitterHandle);
    //                 newFoodTruckBody.append(newTwitterHandle);

    //                 var newCuisine = $("<p>");
    //                 newCuisine.text(data.cuisine);
    //                 newFoodTruckBody.append(newCuisine);

    //                 var newDescription = $("<p>");
    //                 newDescription.text(data.description);
    //                 newFoodTruckBody.append(newDescription);

    //                 $("#foodTruckDetails").append(newFoodTruckBody);
                    
    //                 // Reload the page to get the updated list
    //                 // location.reload();
    //             }
    //         );
    // });
}); 