var map;
var dataResults;
var kmlLayer;

function initialize() {
    map = new google.maps.Map(document.getElementById('mapdisplay'), {
        zoom: 10,
        center: new google.maps.LatLng(49, -123),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    //addMarkers();
    // Add an event handler to the button.
    
    console.log("here1");
    kmlLayer = new google.maps.KmlLayer({
        url: 'https://dl.dropboxusercontent.com/u/3137747/tester.kml',
    });
    console.log("here2");
    google.maps.event.addListener(kmlLayer, 'status_changed', function () {
        console.log("listender added");
        if (kmlLayer.getStatus() == google.maps.KmlLayerStatus.OK) {
            kmlLayer.setMap(map);
            console.log("success");
        }
        else {
            // Failure
            console.log("fail");
        }
    });
    console.log("here3");


    var searchButton = document.getElementById("searchButton");
    searchButton.addEventListener("click", buttonClickHandler, false);
    document.getElementById("searchButton").addEventListener("click", getLocation);

    document.getElementById("startTracking").addEventListener("click",
            defaultZoomMap);


}

function defaultZoomMap() {
    sleep(4000);
    var newCenter = new google.maps.LatLng(49.276842034114196, -122.9143051590263)
    map.setCenter(newCenter);
    var marker = new google.maps.Marker({
        map: map,
        position: newCenter
    });
    map.setZoom(14);
    map.panTo(marker.position);
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

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
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
            var lat = results[0].geometry.location.lat();
            var lng = results[0].geometry.location.lng();
            zoomMap(lat, lng);
        }
        else {
            alert("Request failed.")
        }
    })
    
}

function zoomMap(lat, long) {
    var newCenter = new google.maps.LatLng(lat, long)
    map.setCenter(newCenter);
    var marker = new google.maps.Marker({
        map: map,
        position: newCenter
    });
    map.setZoom(14);
    map.panTo(marker.position);
}

google.maps.event.addDomListener(window, 'load', initialize);


