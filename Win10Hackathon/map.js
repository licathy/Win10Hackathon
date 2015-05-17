var map;
var dataResults;


function initialize() {
    map = new google.maps.Map(document.getElementById('mapdisplay'), {
        zoom: 3,
        center: new google.maps.LatLng(40, -187.3),
        mapTypeId: google.maps.MapTypeId.TERRAIN
    });

    addMarkers();
}

eqfeed_callback = function (results) {
    dataResults = results;
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

google.maps.event.addDomListener(window, 'load', initialize);