// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509


(function () {
	"use strict";

	var app = WinJS.Application;
	var activation = Windows.ApplicationModel.Activation;



	app.onactivated = function (args) {
		if (args.detail.kind === activation.ActivationKind.launch) {
			if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
				// TODO: This application has been newly launched. Initialize your application here.
			} else {
				// TODO: This application has been reactivated from suspension.
				// Restore application state here.
			}
			args.setPromise(WinJS.UI.processAll().
                done(function () {

			    // Add an event handler to the button.
			    document.getElementById("startTracking").addEventListener("click",
                    trackloc);

               //document.getElementById("searchButton").addEventListener("click", getLocation);

			}));



			var locationButton = document.getElementById("startTracking");
			locationButton.addEventListener("click", buttonClickHandler2, false);

			
		}
	};



	var loc = null;

	function trackloc() {
	    if (loc == null) {
	        loc = new Windows.Devices.Geolocation.Geolocator();
	    }
	    if (loc != null) {
	        loc.addEventListener("positionchanged", onPositionChanged);
	        loc.addEventListener("statuschanged", onStatusChanged);
	        // display initial status, in case location is turned off.
	        document.getElementById('geolocatorStatus').innerHTML =
                getStatusString(loc.locationStatus);
	    }
	   
	}


	function onPositionChanged(args) {
	    var pos = args.position;
	    document.getElementById('latitude').innerHTML =
            pos.coordinate.point.position.latitude;
	    document.getElementById('longitude').innerHTML =
            pos.coordinate.point.position.longitude;
	    document.getElementById('geolocatorStatus').innerHTML =
                getStatusString(loc.locationStatus);
	}

    // Handle change in status to display an appropriate message.        
	function onStatusChanged(args) {
	    var newStatus = args.status;
	    document.getElementById('geolocatorStatus').innerHTML =
            getStatusString(newStatus);
	}

	function getStatusString(locStatus) {
	    switch (locStatus) {
	        case Windows.Devices.Geolocation.PositionStatus.ready:
	            // Location data is available
	            return "Location found.";
	            break;
	        case Windows.Devices.Geolocation.PositionStatus.initializing:
	            // This status indicates that a GPS is still acquiring a fix
	            return "Searching for location...";
	            break;
	        case Windows.Devices.Geolocation.PositionStatus.noData:
	            // No location data is currently available
	            return "Location is currently unavailable.";
	            break;
	        case Windows.Devices.Geolocation.PositionStatus.disabled:
	            // The app doesn't have permission to access location,
	            // either because location has been turned off.
	            return "Your location is currently turned off. " +
                    "Change your settings through the Settings charm " +
                    " to turn it back on.";
	            break;
	        case Windows.Devices.Geolocation.PositionStatus.notInitialized:
	            // This status indicates that the app has not yet requested
	            // location data by calling GetGeolocationAsync() or
	            // registering an event handler for the positionChanged event.
	            return "Location status is not initialized because " +
                    "the app has not requested location data.";
	        case Windows.Devices.Geolocation.PositionStatus.notAvailable:
	            // Location is not available on this version of Windows
	            return "You do not have the required location services " +
                    "present on your system.";
	            break;
	        default:
	            return "Unknown status.";
	    }
	}


	app.oncheckpoint = function (args) {
		// TODO: This application is about to be suspended. Save any state that needs to persist across suspensions here.
		// You might use the WinJS.Application.sessionState object, which is automatically saved and restored across suspension.
		// If you need to complete an asynchronous operation before your application is suspended, call args.setPromise().
	};

	

	function buttonClickHandler2(eventInfo) {
        var output = "Parking near you: ";
        document.getElementById("resultOutput").innerText = output;
	}


	app.start();

})();



