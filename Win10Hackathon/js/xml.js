// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
	"use strict";

	function parseCoord() {
	    var latTemp;
	    var longTemp;
	    var j = 0;
	    var str;
	    var coord2DArray = loadCoord();
	    for (i = 0; i < coordArray.length; i++) {
	        coord2DArray[i] = new Array(2);
	    }
	    console.log("length " + coordArray.length);
	    var count = 0;

	    for (var i = 0; i < coordArray.length; i++) {
	        j = 0;
	        str = coordArray[i].childNodes[0].nodeValue.split(",");
	       latTemp = coord2DArray[i, j] = str[0];
	       longTemp = coord2DArray[i, j + 1] = str[1];
	       count = count + 1;
	      //console.log(i + " lat " + latTemp);
	      //console.log(i + " long " + longTemp);
	    }
	    console.log("count " + count);
	    return coord2DArray;
	}

    //returns description for current coordinate index in array
	function getCurDescr(int) {
	    var dArray = loadDescr();
	    return dArray[int].childNodes[0].nodeValue;
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
})();
