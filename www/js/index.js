// load the map
var mymap = L.map('mapid').setView([51.505, -0.09], 13);

// keep device location in this variable
var devLocation = null;

// now add the click event detector to the map
mymap.on('click', onMapClick);



// stores device location
this.getLocation();

// detect movement and store new location
this.trackLocation();



//load the tiles
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors,' +
        '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>,' +
        'Imagery © <a href="http://mapbox.com">Mapbox</a>',
    id: 'mapbox.streets'
}).addTo(mymap);




//create an event detector to wait for the user's click event and then use the popup to show them where they clicked
function onMapClick(e) {
    // create a custom popup
    var popup = L.popup();

    popup.setLatLng(e.latlng)
        .setContent('<iframe style="width: 400px; height: 500px;" src="./createForm.html"></iframe>')
        .openOn(mymap);


    if(devLocation){
        var d = calculateDistance(e.latlng.lat, e.latlng.lng, devLocation.latitude, devLocation.longitude, "K");
        console.log("Distance from you: " + d + "KM")
    }
}





////////////////////////////////////////////////////////////////////////////////////
function getLocation() {
    // getPosition is the function that should be called once the position has been found
    return navigator.geolocation.getCurrentPosition(getPosition);
}
function getPosition(position) {
    // the system automatically gives you the position variable, and you can
    // get the coordinates lat and lng from there and
    // then modify a DIV to show the results to the user
    devLocation = position.coords;
    console.log("Initial Position", position.coords);
}
////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////
function trackLocation() {
    if (navigator.geolocation) {
        // showPosition is the method called automatically when the position changes
        navigator.geolocation.watchPosition(showPosition);
    }
}
function showPosition(position) {
    // use the position variable to get the actual coordinates
    devLocation = position.coords;
    console.log("Moved to", position);
}
////////////////////////////////////////////////////////////////////////////////////



function calculateDistance(lat1, lon1, lat2, lon2, unit) {
    //Convert lats to radian
    var radlat1 = Math.PI * lat1 / 180
    var radlat2 = Math.PI * lat2 / 180

    // find the difference in longitude and convert to radians
    var theta = lon1 - lon2
    var radtheta = Math.PI * theta / 180

    // then calculate the distance
    var subAngle = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    subAngle = Math.acos(subAngle) // this is a value in radians so need to convert to km
    subAngle = subAngle * 180 / Math.PI // distance * 2 * pi /360 OR distance * pi/180
    
    var dist = (subAngle / 360) * 2 * Math.PI * 3956; // angle/360 * 2 * pi * radius – calculate arc length
    if (unit == "K") { dist = dist * 1.609344 }
    if (unit == "N") { dist = dist * 0.8684 }
    return dist
}






////////////////////////////////////////////////////////////////////////////////////
// create a GeoJSON Feature
var geojsonFeature = {
    "type": "Feature",
    "properties": {
        "name": "London",
        "popupContent": "This is where UCL is based."
    },

    "geometry": {
        "type": "Point",
        "coordinates": [-0.133480, 51.524287]
    }
};

// create a custom Marker icon
var testMarkerPink = L.AwesomeMarkers.icon({
    icon: 'play',
    markerColor: 'pink'
});

// and add it on the map
L.geoJSON(geojsonFeature, {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, { icon: testMarkerPink });
    }
}).addTo(mymap).bindPopup("<b>" + geojsonFeature.properties.name + "" + geojsonFeature.properties.popupContent + "<b>");
////////////////////////////////////////////////////////////////////////////////////
