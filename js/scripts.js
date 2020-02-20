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
    zoom: 3
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
  var asiaLngLat = [84.431641,32.768800]

  map.flyTo({
    center: asiaLngLat,
    zoom: 3
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
    zoom: 3
  })
})
$('#aorld').on('click', function() {
  map.flyTo({
    center: initialCenterPoint,
    zoom: 1
  })
})


var ElementStacks = new Class({
    Implements: [Options],

    options: {
        rotationDeg: 20,
        delay: 40,
        duration: 900,
        transition: 'back:out'
    },

    initialize: function(selector, wrapper, options){
        this.setOptions(options);
        this.pos, this.collapsed, this.wrapper = wrapper, this.stackItems = selector

        this.setDefaults();
    },

    setDefaults: function(){
        this.stackItems.each(function(stackItem){
            this.pos = stackItem.getPosition(this.wrapper);

            stackItem.store('default:coords', this.pos);

            stackItem.set('styles', {
                top: this.pos.y,
                left: this.pos.x
            });

            stackItem.set('morph', {
                transition: this.options.transition,
                duration: this.options.duration
            });

            // MooTools bug (?)
            (function(){
                this.setStyle('position', 'absolute');
            }).delay(1, stackItem);
        }, this);

        this.attachActions();
    },

    reStack: function(els, mode, altEl){
        var that = this;
        els.each(function(stackItem, i){
            (function(){
                var el = $pick(altEl, this);
                var rand = (mode === 'in' ? $random(-that.options.rotationDeg, that.options.rotationDeg) : 0);

                this.set('styles', {
                    '-webkit-transform': 'rotate(' + rand + 'deg)',
                    '-moz-transform': 'rotate(' + rand + 'deg)'
                });

                this.morph({
                    top: el.retrieve('default:coords').y + rand,
                    left: el.retrieve('default:coords').x + rand
                });

                if (mode === 'in'){
                    el.setStyle('z-index', 100);
                } else {
                    (function(){
                        els.setStyle('z-index', 10);
                    }).delay(that.options.delay * (els.length * 2));
                }
            }).delay(that.options.delay * i, stackItem);
        });
    },

    attachActions: function(){

        this.stackItems.addEvents({
            click: function(e){

                if (this.collapsed){
                    this.reStack(this.stackItems);
                    this.collapsed = false;
                } else {
                    var target = $(e.target);

                    if (target.retrieve('default:coords')){
                       this.reStack(this.stackItems, 'in', target);
                       this.collapsed = true;
                    }
                }
            }.bind(this)
        });
    }
});

new ElementStacks($$('img'), $('wrapper'));
