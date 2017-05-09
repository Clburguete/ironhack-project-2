/*jshint esversion: 6*/
$(document).ready(function() {
  const center = {
      lat: 40.417080,
      lng: -3.703612
  };



  let markers = [];
  myEvents.forEach(function(event) {
      let title = event.name;
      let position = {
          lat: event.location.coordinates[1],
          lng: event.location.coordinates[0]
      };
      let pin = new google.maps.Marker({
          position,
          map,
          title
      });
      markers.push(pin);
  });


  // Map initialization
  var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: center
  });

      for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(map);
      }

console.log(markers);
  // function clearMarkers() {
  //     setMapOnAll(null);
  // }



});
