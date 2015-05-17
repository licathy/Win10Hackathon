var map;
var dataResults;


function initialize() {
    map = new google.maps.Map(document.getElementById('mapdisplay'), {
        zoom: 10,
        center: new google.maps.LatLng(49, -123),
        mapTypeId: google.maps.MapTypeId.TERRAIN
    });

    addMarkers();
    // Add an event handler to the button.
    

    var searchButton = document.getElementById("searchButton");
    searchButton.addEventListener("click", buttonClickHandler, false);
    document.getElementById("searchButton").addEventListener("click", getLocation);


}


function buttonClickHandler(eventInfo) {
    var address = document.getElementById("addInput").value;
    var output = "Parking near " + address + ":";
    document.getElementById("resultOutput").innerText = output;
}

/*function buttonClickHandler2(eventInfo) {
    var output = "Parking near you: ";
    document.getElementById("resultOutput").innerText = output;
}*/


eqfeed_callback = function (results) {
    dataResults = results;
}

function changeMap() {
    console.log("changeMap");
}

function addMarkers() {
    for (var i = 0; i < dataResults.features.length; i++) {
        var quake = dataResults.features[i];
        var coors = quake.geometry.coordinates;
        var latLong = new google.maps.LatLng(coors[1], coors[0]);
        var marker = new google.maps.Marker({
            position: latLong,
            map: map
            //icon: getCircle(earthquake.properties.mag)
        });
    }
}

function getCircle(magnitude) {
    return {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: 'red',
        fillOpacity: .2,
        scale: Math.pow(2, magnitude) / Math.PI,
        strokeColor: 'white',
        strokeWeight: .5
    };
}

function getLocation() {
    var geocoder = new google.maps.Geocoder();
    var address = document.getElementById("addInput").value;
    geocoder.geocode({ 'address': address }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            document.getElementById('latitude').innerHTML = results[0].geometry.location.lat();
            document.getElementById('longitude').innerHTML = results[0].geometry.location.lng();
            document.getElementById('geolocatorStatus').innerHTML = "Location found."
        }
        else {
            alert("Request failed.")
        }
    })
    console.log("does get location work");
}



google.maps.event.addDomListener(window, 'load', initialize);