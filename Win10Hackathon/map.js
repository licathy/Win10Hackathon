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

var coord2DArray = [];

function parseCoord() {
    var latTemp;
    var longTemp;
    var j = 0;
    var str;
    //var coord2DArray = [];
    var coordArray = loadCoord();
    console.log("coordArray length: " + coordArray.length);
    for (i = 0; i < coordArray.length; i++) {
        coord2DArray[i] = new Array(2);
    }
    console.log("length " + coordArray.length);
    var count = 0;

    for (k = 0; k < coordArray.length; k++) {
        j = 0;
        str = coordArray[k].childNodes[0].nodeValue.split(",");
        coord2DArray[k][j] = str[1];
        coord2DArray[k][j + 1] = str[0];
        count = count + 1;
        //console.log(i + " lat " + coord2DArray[k][j]);
        //console.log(i + " long " + coord2DArray[k][j+1]);
    }
    /*console.log("after parsing, " + coord2DArray[0][0]);
    console.log("after parsing, " + coord2DArray[0][1]);
    console.log("after parsing, " + coord2DArray[1][0]);
    console.log("after parsing, " + coord2DArray[1][1]);
    console.log("after parsing, " + coord2DArray[2][0]);
    console.log("after parsing, " + coord2DArray[2][1]);
    console.log("count " + count);*/
    //return coord2DArray;
}

//returns description for current coordinate index in array
function getCurDescr(x, y) {
    var j = 0;
   // var cArray = parseCoord();
    var dArray = loadDescr();
    console.log(dArray[0].childNodes[0].nodeValue);
    console.log(coord2DArray[0][1]);
    for (i = 0; i < coord2DArray.length; i++) {
        j = 0;
        if (x === coord2DArray[i][j]) {
            console.log(x);
            console.log(coord2DArray[i][j + 1]);
            if (y === coord2DArray[i][j+1]) {
                var str = dArray[i].childNodes[0].nodeValue;
                console.log(str);
                return str;
            }
            else {
                i++;
            }
        }
        else {
            i++;
        }
    }
}

//load xml file then return two arrays, coordinate and descriptions
function loadCoord() {
    function loadXMLDoc(filename) {
        if (window.XMLHttpRequest) {
            var xmlhttp = new XMLHttpRequest();
        }
        else {
            var xmlhttp = new ACtiveXObject("Microsoft.XMLTTP");
        }
        xmlhttp.open("GET", filename, false);
        xmlhttp.send();
        console.log("test 1");
        return xmlhttp.responseXML;
    }

    var xmlDoc = loadXMLDoc("https://dl.dropboxusercontent.com/u/3137747/parking_meter_rates_and_time_limits.xml");
    console.log("test 2");

    var coord = xmlDoc.getElementsByTagName("coordinates");
    return coord;
}

function loadDescr() {
    function loadXMLDoc(filename) {
        if (window.XMLHttpRequest) {
            var xmlhttp = new XMLHttpRequest();
        }
        else {
            var xmlhttp = new ACtiveXObject("Microsoft.XMLTTP");
        }
        xmlhttp.open("GET", filename, false);
        xmlhttp.send();
        console.log("test 1");
        return xmlhttp.responseXML;
    }

    var xmlDoc = loadXMLDoc("https://dl.dropboxusercontent.com/u/3137747/parking_meter_rates_and_time_limits.xml");
    console.log("test 2");

    var descr = xmlDoc.getElementsByTagName("description");
    return descr;
}

function defaultZoomMap() {
    sleep(4000);
    var newCenter = new google.maps.LatLng(49.276842034114196, -122.9143051590263);
    map.setCenter(newCenter);
    var marker = new google.maps.Marker({
        map: map,
        position: newCenter
    });
    map.setZoom(14);
    map.panTo(marker.position);
}

function findNearPoints(lat1, lon1) {
    //var coord2DArray = parseCoord();
    parseCoord();
    var count = 0;
    var myNearPoints = [];
    //console.log(coord2DArray.length);
    //console.log(coord2DArray[0,0]);
    //console.log(coord2DArray[1,0]);
    for (i = 0; i < coord2DArray.length; i++) {
        // console.log(coord2DArray[i][1]-lon1);
        if (count < 20) {
            //if (coord2DArray[i][0] - lat1 < 0.005 || coord2DArray[i][0] - lat1 > 0.005) {
            // if (coord2DArray[i][1] - lon1 < 0.005 || coord2DArray[i][1] - lon1 > 0.005) {
            if(Math.abs(lat1+lon1-coord2DArray[i][0]-coord2DArray[i][1]) < 0.0005) {
                    myNearPoints.push(coord2DArray[i][0]);
                    myNearPoints.push(coord2DArray[i][1]);
                    count = count + 1;
                    //console.log("count " + count);
                //}
            }
        }
       // console.log("my while loop is executing");
    }
    var marker;
   /* console.log(myNearPoints[0]);
    console.log(myNearPoints[1]);
    console.log(myNearPoints[2]);
    console.log(myNearPoints[3]);
    console.log(myNearPoints[4]);
    console.log(myNearPoints[5]);*/
    var infowindow = new google.maps.InfoWindow();

    for (j = 0; j < myNearPoints.length; j++) {
        var lat = myNearPoints[j];
        var long = myNearPoints[j + 1];
        //console.log(lat);
        //console.log(long);
        var newCenter = new google.maps.LatLng(lat, long);
        marker = new google.maps.Marker({
            map:map,
            position: newCenter
        });
        j = j + 1;
        google.maps.event.addListener(marker, 'click', (function (marker, i) {
            return function () {
                infowindow.setContent(getCurDescr(lat, long));
                infowindow.open(map, marker);
            }
        })(marker, i));

        //map.panTo(marker.position);
       //console.log("adding markers");
    }
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
            findNearPoints(lat, lng);
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
        position: newCenter,
        animation: google.maps.Animation.DROP,
        icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
    });
    map.setZoom(14);
    map.panTo(marker.position);
}

google.maps.event.addDomListener(window, 'load', initialize);


