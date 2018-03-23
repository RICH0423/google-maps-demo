function initData() {
  fetch(API_URL, {
      method: 'get'
    })
    .then(function(response) {
      if (!response.ok) {
        console.log('Fetch data error. Status Code: ' + response.status);
        var error = new Error(response.statusText)
        error.response = response
        throw error
      }
      return response.json();

    }).then(function(data) {
      var vehicleLocations = data['RESULT'];
      var markers = vehicleLocations.map(function(vehicle, i) {
        console.log('vehicle data: ' + vehicle);

        var marker = new google.maps.Marker({
          position: new google.maps.LatLng(vehicle['gps_lat'], vehicle['gps_long']),
          map: map,
          label: vehicle['bike_id']
        });
        marker.addListener('click', function() {
          // map.setZoom(22);
          map.setCenter(marker.getPosition());
          infowindow.setContent(vehicle['bike_id']);
          infowindow.open(map, marker);
        });
        return marker
      });

      // Add a marker clusterer to manage the markers.
      var markerCluster = new MarkerClusterer(map, markers, {
        imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
      });
    }).catch(function(err) {
      console.log('Fetch Error :-S', err);
    })
}

function addCoordinate() {
  console.log("Exe addCoordinate()");
  // get existing path
  var path = poly.getPath();
  // append a new coordinate
  var newLocation = new google.maps.LatLng(25.035421, 121.513620);
  path.push(newLocation);

  // Add a new marker at the new plotted point on the polyline.
  marker = new google.maps.Marker({
    position: newLocation,
    map: map
  });
}