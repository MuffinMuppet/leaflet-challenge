//Creating the initial map object and assign it the id map.
var myMap = L.map("map", {
   //add the longitude and latitude and zoom size
    center: [53.874, -166.566833333333]
    zoom:5
});

// Adding the tile layer to map using the OpenStreetMap tile as source. 
    //URL code was copied from Activity 1 of Week 1 of GEO JSON Module.

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Use a getColor function to get a color mapping, taking into account the magnitude of the quake.

function getColor(depth) {

    // Custom Color Map based on depth ranges: Range is 20 between lower and upper limit

    if (depth <= 10){
        return "blue";
    } else if (depth > 10 && depth <= 30) {
        return "grey";
    } else if (depth > 30 && depth <= 50) {
        return "green";
    } else if (depth > 50 && depth <= 70) {
        return "yellow";
    } else if (depth > 70 && depth <= 90) {
        return "red";
    } else if (depth > 90 && depth <= 110) {
        return "purple";
    } else if (depth >110) {
        return "black"
    }
};

// Set URL of choice as Query and have it retrieve all the earthquake data in the GeoJSON format inn this URL.
// URL is set to all week data on quakes.

var query = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
d3.json(query).then(function(data) {
    
    // Loop through the data

    var markers = L.featureGroup(); // Create a feature group to hold all the markers
  data.features.forEach(function(earthquake) {
    var coord = earthquake.geometry.coordinates;
    var magnitude = earthquake.properties.mag;
    var depth = coord[2];
    var date = new Date(earthquake.properties.time).toLocaleString();
    var size = magnitude * 5;
    var markerColor = getColor(depth);

    //
})
