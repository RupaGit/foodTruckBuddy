$(document).ready(function () {
    $("#nav-placeholder").load("nav.html");
    $("#addressSubmit").on("click", function (event) {
        event.preventDefault();

        // Grabbing and storing the data-animal property value from the button
        var address = $("#userAddress").val().trim();
        address = address.split(" ");
        address = address.join("+");
        console.log(address);

        // console.log(address);

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
                var latLng = response.results[0].locations[0].latLng;
                console.log(latLng);

            });



    });
});    