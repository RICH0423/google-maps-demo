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

        var goods = Math.floor((Math.random() * 10) + 1);
        var contentString = '<div id="content">'+
            '<h3>'+ vehicle['bike_id'] +
            ' - Deliveryman01</h3>'+
            '<div id="bodyContent">'+
            '<p>' +
            '<p><font color="red">Out Going</font><font color="blue">→</font>Delivered<font color="blue">→</font>Return<br/>' +
            '<img src="images/green_light.png" width="12" height="12" alt="CROSS PATH"><font color="blue">CROSS PATH</font><br/>' +
            '<img src="images/green_light.png" width="12" height="12" alt="DELIVERED OVERTIME"><font color="blue">DELIVERED OVERTIME</font><br/>' +
            '<img src="images/green_light.png" width="12" height="12" alt="RETURN OVERTIME"><font color="blue">RETURN OVERTIME</font><br/>' +
            '<font color="blue">RM%：</font><font color="green">85%</font>&nbsp;&nbsp;&nbsp;&nbsp;' +
            '<font color="blue">Goods TEMP：</font><font color="green">'+ goods +'</font>&nbsp;&nbsp;&nbsp;&nbsp;' +
            '<font color="blue">MODE：</font><font color="green">M3</font></p>'
            '</div>'+
            '</div>';

        var marker = new google.maps.Marker({
          position: new google.maps.LatLng(vehicle['gps_lat'], vehicle['gps_long']),
          map: map,
          label: vehicle['bike_id']
        });
        marker.addListener('click', function() {
          // map.setZoom(22);
          map.setCenter(marker.getPosition());
          infowindow.setContent(contentString);
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
