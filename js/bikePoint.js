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
      console.log('vehicleLocations: ');
      console.log(vehicleLocations);
      var markers = vehicleLocations.map(function(vehicle, i) {
        console.log('vehicle data: ' + vehicle);

        var contentString = '<div id="content">'+
            '<h3>'+ vehicle['bike_id'] +
            '</h3>' +
            '<div id="bodyContent">' +
            '<p>' + vehicle['gps_lat'] + ',' + vehicle['gps_long'] + '</p>' +
            '</div>' +
            '</div>';

        var marker = new google.maps.Marker({
          position: new google.maps.LatLng(vehicle['gps_lat'], vehicle['gps_long']),
          map: map,
          label: vehicle['bike_id']
        });
        marker.addListener('click', function() {
          // map.setZoom(22);
          // map.setCenter(marker.getPosition());
          infowindow.setContent(contentString);
          infowindow.open(map, marker);
        });

        map.setCenter(new google.maps.LatLng(vehicle['gps_lat'], vehicle['gps_long']));
        return marker
      });

      // Add a marker clusterer to manage the markers.
      var markerCluster = new MarkerClusterer(map, markers, {
        maxZoom: 20, //The maximum zoom level that a marker can be part of a cluster.
        imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
      });
    }).catch(function(err) {
      console.log('Fetch Error :-S', err);
    })
}
