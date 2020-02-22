$(document).ready(function () {
    $("#nav-placeholder").load("nav.html");


    $("#signup").on("click", function (event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();


        var newUser = {
            userName: $("#userName").val().trim(),
            email: $("#userEmail").val().trim(),
            password: $("#userPassword").val().trim()
        };

        // Send the POST request.
        $.ajax("/api/signup", {
            type: "POST",
            data: newUser
        }).then(
            function () {
                console.log("created new User");
                // Reload the page to get the updated list
                window.location.href = '/login.html'; //relative to domain

            }
        );
    });
}); 