var latlng = [];


function initMap() {
    var url = document.location.href,
        params = url.split('?')[1].split('&'),
        data = {}, tmp;
    for (var i = 0, l = params.length; i < l; i++) {
        tmp = params[i].split('=');
        data[tmp[0]] = tmp[1];
    }
    var lat = parseFloat(data.lat);
    var lng = parseFloat(data.lng);
    var userLoc = { lat, lng }
    var goldStar = {
        path: 'M 125,5 155,90 245,90 175,145 200,230 125,180 50,230 75,145 5,90 95,90 z',
        fillColor: 'yellow',
        fillOpacity: 1,
        scale: 0.1,
        strokeColor: 'gold',
        strokeWeight: 4
    };
    // document.getElementById('here').innerHTML = data.address;
    console.log("URL data is", data);
    var options = {
        zoom: 15,
        center: userLoc
    }
    var map = new google.maps.Map(document.getElementById('map'), options);
    addMarker(userLoc, goldStar);
    $.ajax("/api/getTruckDetails", {
        type: "GET",
      }).then(function (data) {
        console.log(data);
        for(var i=0; i<data.length; i++){
            var newCard = $("<div>");
            var newCardHeader = $("<div>");
            var newCardBody = $("<div>");
            newCard.addClass("card");
            newCardHeader.addClass("card-header");
            newCardBody.addClass("card-body");
            newCardHeader.append($("<h5>").text(data[i].FoodTruck.truckName+" (Yelp Rating: "+data[i].FoodTruck.rating+")"));
            newCardBody.append($("<h5>").text(data[i].FoodTruck.description), "<br/>");
            newCardBody.append($("<p>").text("Cusine: "+data[i].FoodTruck.cuisine));
            newCardBody.append($("<p>").text("Follow on Twitter: "+data[i].FoodTruck.twitterHandle));
            newCardBody.append($("<p>").text(data[i].location));
            newCard.append(newCardHeader, newCardBody, "<br />");
            latlng.push({lat: data[i].latitude, lng: data[i].longitude });
            $("#truckList").append(newCard);
        }
        console.log("Latitude longiture is ", latlng.length);
        for(var i=0; i<latlng.length; i++){
            // console.log(latlng[i]);
            console.log(i)
            addMarker(latlng[i]);
        }

        
    });
 
    function addMarker(coordinates, icontype) {
        console.log("I am in add marker",coordinates);
        var marker = new google.maps.Marker({
            position: coordinates,
            map: map,
            icon: icontype
        });
    }
}

// function findFoodTrucks(){
    
// }



$(document).ready(function () {
    $("#nav-placeholder").load("nav.html");
    // findFoodTrucks();

    // google.maps.event.addDomListener(window, 'load', initMap); 

});