# google-maps-demo

## Dependencies
- [Google Maps JavaScript API - V3](https://developers.google.com/maps/documentation/javascript/)
- [google.maps.geometry library](https://developers.google.com/maps/documentation/javascript/geometry) 


---

## Marker
- Create a marker
```js
function initMap() {
  var location1 = {lat: 25.039051, lng: 121.509885};

  // create a new Google maps object.
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: location1
  });

  // create a marker
  var marker = new google.maps.Marker({
    position: {lat: 25.020023, lng:121.539662}, // specifies a LatLng
    map: map,
    icon: 'image/bicycle-rider.png',  // marker's customize icon
    title: 'Test Marker'  //marker's title
  });
}
```

- Add a marker to the map
```js
var marker = new google.maps.Marker({
  position: myLatlng,
  title:"Hello World!"
});

marker.setMap(map);
```

- Remove a marker
```js
marker.setMap(null);
```

## Shapes

- Add a polyline
```js
var bikeCoordinates = [
  {lat: 37.772, lng: -122.214},
  {lat: 21.291, lng: -157.821}
];

var bikePath = new google.maps.Polyline({
  path: bikeCoordinates,
  geodesic: true,
  strokeColor: '#FF0000',
  strokeOpacity: 1.0,
  strokeWeight: 2
});

bikePath.setMap(map);
```

- Remove a polyline
```js
bikePath.setMap(null);
```

- Adds a new point to the Polyline
```js
var path = bikePath.getPath();
var newLocation = new google.maps.LatLng(25.035421, 121.513620);  // append a new point
path.push(newLocation);
```
- Add a circle
```js
var dummyStoreCircle = new google.maps.Circle({
  strokeColor: '#FF0000',
  strokeOpacity: 0.8,
  strokeWeight: 2,
  fillColor: '#0066FF',
  fillOpacity: 0.20,
  map: map,
  center: {lat: 25.035060, lng: 121.383648},
  radius: 3000  //radius of the circle (meters)
});
```

## Geometry Library

## Reference
- https://developers.google.com/maps/documentation/javascript/tutorial
- https://developers.google.com/maps/documentation/javascript/events
- https://developers.google.com/maps/documentation/javascript/geometry
