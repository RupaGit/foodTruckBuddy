
//Function to get latitude and longitude of provided an address. 
function getLatLng(address) {    
    address = address.split(" ");
    address = address.join("+");
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
            var data = response.results[0].locations[0].latLng;
            console.log(data);
            var url = '/displayMaps.html?lat=' + encodeURIComponent(data.lat)+"&lng="+encodeURIComponent(data.lng);
            console.log(url);
            document.location.href = url;
        });
}

$(document).ready(function () {
    $("#nav-placeholder").load("nav.html");
    $("#addressSubmit").on("click", function (event) {
        event.preventDefault();
        var address = $("#userAddress").val().trim();
        getLatLng(address);
    });
});
