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
    var userLoc = {lat,lng}
    var goldStar = {
        path: 'M 125,5 155,90 245,90 175,145 200,230 125,180 50,230 75,145 5,90 95,90 z',
        fillColor: 'yellow',
        fillOpacity: 1,
        scale: 0.1,
        strokeColor: 'gold',
        strokeWeight: 4
      };

    // document.getElementById('here').innerHTML = data.address;
    console.log("URL data is",data);
        var options = {
            zoom: 15,
            center: userLoc
        }
        var map = new google.maps.Map(document.getElementById('map'), options);
        addMarker(userLoc,goldStar);
        addMarker({lat:40.7128,lng:-74.0060});
        addMarker({lat:40.707904, lng:-74.010289});
        function addMarker(coordinates,icontype) {
            var marker = new google.maps.Marker({
                position: coordinates,
                map: map,
                icon: icontype
            });
        }
}

$(document).ready(function () {
    $("#nav-placeholder").load("nav.html");
    // google.maps.event.addDomListener(window, 'load', initMap); 
    
});

