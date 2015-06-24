var BOSTON_LATLNG = [42.35, -71.08];
var INITIAL_ZOOM = 11;

$(document).ready(init_map);

function init_map(){
  var map = L.map('map').setView(BOSTON_LATLNG, INITIAL_ZOOM);
  var credit = '<a href="http://bostonimagingvision.github.io">Boston Imaging and Vision</a>';
  // load a tile layer
  L.tileLayer('http://tiles.mapc.org/basemap/{z}/{x}/{y}.png',
    {
      attribution: credit,
      maxZoom: 17,
      minZoom: 9
    }).addTo(map);
  $.getJSON("data/geo_companies.geojson",
      function(data){
        L.geoJson(data, { pointToLayer: create_marker}).addTo(map);
      });
}

function create_marker(feature, latLng){
  if (feature.properties.name == null){
    return;
  }
  var marker = L.marker(latLng);
  var name = feature.properties.name;
  if (feature.properties.url != null){
    name = '<a href="' + feature.properties.url + '">' + name + '</a>';
  }
  var msg = '<strong>'+name+'</strong>';
  if (feature.properties.address != null){
    msg += '<br/>\n' + feature.properties.address;
  }
  marker.bindPopup(msg);
  return marker;
}
