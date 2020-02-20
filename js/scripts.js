// this is my mapboxGL token
// the base style includes data provided by mapbox, this links the requests to my account
mapboxgl.accessToken = 'pk.eyJ1IjoibW16enl5aGgiLCJhIjoiY2s2dTl6OGNsMDduejNkcXAwYzFmMm5mYSJ9.CbLRIkFjQIPksjZ-wwKWNg';

// we want to return to this point and zoom level after the user interacts
// with the map, so store them in variables
var initialCenterPoint = [0.000000,0.000000]
var initialZoom = 1


// create an object to hold the initialization options for a mapboxGL map
var initOptions = {
  container: 'map-container', // put the map in this container
  style: 'mapbox://styles/mmzzyyhh/ck6uajyf61w431jqhn56amsvg', // use this basemap
  center: initialCenterPoint, // initial view center
  zoom: initialZoom, // initial view zoom level (0-18)
}

// create the new map
var map = new mapboxgl.Map(initOptions);

// add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());

// // make a single marker in central park
//  new mapboxgl.Marker()
//    .setLngLat([-73.974087,40.770718])
//    .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
//     .setHTML('I am in Central Park'))
//    .addTo(map);


// iterate over each object in studentData
studentData.forEach(function(studentEntry) {
  // for each object in the studentData, add a marker to the map with a popup
  new mapboxgl.Marker()
    .setLngLat([studentEntry.Longitude, studentEntry.Latitude])
    .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
     .setHTML(`Institution: ${studentEntry.InstitutionName}
      <br>
      ${studentEntry.NumberofResearchers} researchers published ${studentEntry.ArticlespublishedbytheResearchers} coronavirus related publications!`))
    .addTo(map);
})

// event listeners for the fly to buttons

$('#Africa').on('click', function() {
  map.flyTo({
    center: [21.445313,-1.450040],
    zoom: 2
  })
})

$('#America').on('click', function() {

  var americaLngLat = [-85.429688,26.980829]

  map.flyTo({
    center: americaLngLat,
    zoom: 2
  })
})

$('#Asia').on('click', function() {
  var asiaLngLat = [100.546875,32.657876]

  map.flyTo({
    center: asiaLngLat,
    zoom: 2
  })
})
$('#Europe').on('click', function() {
  var euLngLat = [18.457031,52.776186]

  map.flyTo({
    center: euLngLat,
    zoom: 3
  })
})

$('#Australia').on('click', function() {
  var ausLngLat = [141.767578,-27.722436]

  map.flyTo({
    center: ausLngLat,
    zoom: 2
  })
})
$('#aorld').on('click', function() {
  map.flyTo({
    center: initialCenterPoint,
    zoom: 1
  })
})
