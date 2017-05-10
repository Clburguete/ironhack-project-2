/*jshint esversion: 6*/
// $.ajax({
//     url: '/events/all',
//     method: "GET",
//     success: function(response) {
//         console.log(response);
//         console.log('hola');
//     },
//     error: function(err) {
//         console.log(err);
//     },
// });

$(document).ready(function() {
  const center = {
      lat: 40.417080,
      lng: -3.703612
  };



  let markers = [];
  let myMarkers = myEvents[0];
  myMarkers.forEach(function(event,index) {
      let title = myEvents[0][index].name;
      let position = {
          lat: myEvents[0][index].location.coordinates[1],
          lng: myEvents[0][index].location.coordinates[0]
      };
      let pin = new google.maps.Marker({
          position,
          map,
          title
      });
      markers.push(pin);
  });
console.log(markers);

  // Map initialization
  var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: center
  });

      for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(map);
      }

//console.log(markers);
  // function clearMarkers() {
  //     setMapOnAll(null);
  // }



});
