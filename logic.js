// Create a map object
var myMap = L.map("map", {
  center: [36.1699, -115.1398],
  zoom: 4
});

L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets-basic",
  accessToken: API_KEY
}).addTo(myMap);

// Define a markerSize function that will give each city a different radius based on its population
function magSize(mag) {
  return mag *10000;
}

function colorPick(d){
  if (d>5) {
    return '#d14b1f'
  }
  else if (d>4){
    return '#ce752d'
  }
  else if(d>3){
  return '#c4851f'
}
else if(d>2){
  return '#c9b628'
}
else if(d>1){
  return '#bdcc68'
}
else if(d>0){
  return '#82d16c'
}
else {return 'grey'}
}

// Each city object contains the city's name, location and population
var APILink = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";

var geojson;

// Grab data with d3
d3.json(APILink).then(response => {
  var data=response.features

data.forEach(row => {
  L.circle([row.geometry.coordinates[1],row.geometry.coordinates[0]], {
    fillOpacity: 0.5,
    color: colorPick(row.properties.mag),
    weight:1,
    fillColor: colorPick(row.properties.mag),
    radius: magSize(row.properties.mag)
  }).bindPopup(`<h2>${row.properties.place}</h2><hr><h3>Magnitude of Earthquake: ${row.properties.mag}</h3>`)
    .addTo(myMap);
});

});

/*Legend specific*/
var legend = L.control({ position: "bottomleft" });

legend.onAdd = function(map) {
  var div = L.DomUtil.create("div", "legend");
  div.innerHTML += '<i style="background: #82d16c"></i><span>0-1</span><br>';
  div.innerHTML += '<i style="background: #bdcc68"></i><span>1-2</span><br>';
  div.innerHTML += '<i style="background: #E6E696"></i><span>2-3</span><br>';
  div.innerHTML += '<i style="background: #E8E6E0"></i><span>3-4</span><br>';
  div.innerHTML += '<i style="background: #FFFFFF"></i><span>4-5</span><br>';
  div.innerHTML += '<i style="background: #FFFFFF"></i><span>>5</span><br>';

  
  

  return div;
};

legend.addTo(myMap);