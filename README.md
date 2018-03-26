# google-maps-demo

## Dependencies
- Using the Google Maps JavaScript API (Version 3)
- google.maps.geometry library

### Marker
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

## Reference
- https://developers.google.com/maps/documentation/javascript/tutorial?hl=zh-tw
- https://developers.google.com/maps/documentation/javascript/events?hl=zh-tw
