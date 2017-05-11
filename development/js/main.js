
$(document).ready(function(){



  //
  // function setMapOnAll(map) {
  //     for (var i = 0; i < markers.length; i++) {
  //         markers[i].setMap(map);
  //     }
  // }
  //
  // function clearMarkers() {
  //     setMapOnAll(null);
  // }
  //
  // autocomplete.bindTo('bounds', map);
  //
  //
  //
  // $('form[action="/maps"]').on('submit', function(e) {
  //     e.preventDefault();
  //     $(".status").addClass("clickedstatus");
  //
  //     clearMarkers();
  //     var latitude = autocomplete.getPlace().geometry.location.lat();
  //     var longitude = autocomplete.getPlace().geometry.location.lng();
  //
  //     var newMarker = new google.maps.Marker({
  //         position: {
  //             lat: latitude,
  //             lng: longitude
  //         },
  //         map: map,
  //         title: $("#name").val()
  //     });
  //     markers.push(newMarker);
  //
  //     var EventForm = {
  //         name: $("#name").val(),
  //         description: $("#description").val(),
  //       //  members: document.cookie.session.user,
  //         lat: latitude,
  //         lng: longitude
  //
  //     };
  //
  //     map.setCenter(newMarker.position);
  //     //ajax post, sending EventForm
  //     $.ajax({
  //         method: 'POST',
  //         url: '/maps',
  //         data: EventForm,
  //         success: function() {
  //             console.log(EventForm);
  //             console.log(document.cookie);
  //         },
  //         error: function() {
  //             console.log("ERROR");
  //         }
  //     });
  // });
  //
  //
  //
  // if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(function(position) {
  //         var user_location = {
  //             lat: position.coords.latitude,
  //             lng: position.coords.longitude
  //         };
  //
  //         // Center map with user location
  //         map.setCenter(user_location);
  //
  //
  //     }, function() {
  //         console.log('Error in the geolocation service.');
  //     });
  // } else {
  //     console.log('Browser does not support geolocation.');
  // }

});
