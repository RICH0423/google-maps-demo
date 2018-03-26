function initData() {
  let driveCoordinates = [];
  let vehicleLocations = [];

  // Get bike's location history by bike_id
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
      vehicleLocations.map(function(vehicle, i) {
        driveCoordinates.push({
          "lat": Number(vehicle['gps_lat']),
          "lng": Number(vehicle['gps_long'])
        });

        var poly = new google.maps.Polyline({
          path: driveCoordinates,
          geodesic: true,
          strokeColor: '#0000FF',
          strokeOpacity: 1.0,
          strokeWeight: 2
        });
        poly.setMap(map);

      });

      // get the last vehicle from vehicleLocations
      var lastvehicleLocation = vehicleLocations.pop();
      console.log(lastvehicleLocation);

      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(lastvehicleLocation['gps_lat'], lastvehicleLocation['gps_long']),
        map: map,
        icon: 'image/bicycle-rider.png',
        label: lastvehicleLocation['bike_id']
      });

      // add click listener
      marker.addListener('click', function() {
        // map.setZoom(22);
        map.setCenter(marker.getPosition());
        infowindow.setContent(lastvehicleLocation['update_time']);
        infowindow.open(map, marker);
      });

      map.setOptions({
        center: new google.maps.LatLng(lastvehicleLocation['gps_lat'], lastvehicleLocation['gps_long']),
        zoom: 17
      });

      var dummyStoreMarker = new google.maps.Marker({
        position: new google.maps.LatLng(DUMMY_STORE_POSITION),
        map: map,
        label: 'Store'
      });

      // compute the distance between two points
      var distance = google.maps.geometry.spherical.computeDistanceBetween(marker.getPosition(), dummyStoreMarker.getPosition());       
      document.getElementById('distance').value = distance;
    }).catch(function(err) {
      console.log('Fetch Error :-S', err);
    })
}
