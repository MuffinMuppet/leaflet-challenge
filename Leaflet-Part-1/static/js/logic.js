//Creating the initial map object and assign it the id map.
var myMap = L.map("map", {
   //add the longitude and latitude and zoom size
    center: [0,0], //53.874, -166.566833333333
    zoom:3
});

// Adding the tile layer to map using the OpenStreetMap tile as source. 

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
}

// Set URL of choice as Query and have it retrieve all the earthquake data in the GeoJSON format inn this URL.
// URL is set to all week data on quakes.

var markers = L.featureGroup(); // Create a feature group to hold the markers

// Set URL to variable Query and have it retrieve all the earthquake data in the GeoJSON format in this URL.

var query = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";

d3.json(query).then(function(data) {
    // Loop through the earthquake data and create circle markers with color and size based on magnitude and depth.
    data.features.forEach(function(feature) {
        var latitude = feature.geometry.coordinates[1];
        var longitude = feature.geometry.coordinates[0];
        var magnitude = feature.properties.mag;
        var depth = feature.geometry.coordinates[2];
        var time = new Date(feature.properties.time).toLocaleString();
        var size = magnitude * 7;
        var colorofdot = getColor(depth);

        // Next make the popup markers
        var popup = L.circleMarker([latitude, longitude], {
            radius: size,
            color: colorofdot,
            fillOpacity: 0.5
        }).bindPopup(`<h3>${feature.properties.title}</h3>
                      <hr>
                      <p><b>Location:</b> ${feature.properties.place}</p> 
                      <p><b>Time:</b> ${time}</p>
                      <p><b>Magnitude:</b> ${magnitude}</p>
                      <p><b>Depth:</b> ${depth}</p>
        `);

        markers.addLayer(popup); // Add the marker to the feature group
    });

    // Adding the feature group to the map
    myMap.addLayer(markers);

    // Create a legend control
var legend = L.control({ position: "bottomright" });

// Define the onAdd method for the legend control
legend.onAdd = function (map) {
  // Create a div element for the legend
  var div = L.DomUtil.create("div", "legend");
  

  // Define the labels and corresponding colors for the legend
  var labels = ['Depth <= 10', '10 < Depth <= 30', '30 < Depth <= 50', '50 < Depth <= 70', '70 < Depth <= 90', '90 < Depth <= 110', 'Depth > 110'];
  var colors = ['blue', 'grey', 'green', 'yellow', 'red', 'purple', 'black'];

  // Loop through the labels and colors and create the legend items
  for (var i = 0; i < labels.length; i++) {
    div.innerHTML +=
      '<i style="background:' + colors[i] + '"></i> ' + labels[i] + '<br>';
  }

  return div;
};

// Add the legend to the map
legend.addTo(myMap);

});