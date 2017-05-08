/*jshint esversion: 6*/
$(document).ready(function(){
  const center = {
    lat: 40.417080,
    lng: -3.703612
  };


  let markers = [];
  myEvents.forEach(function(event){
    let title = event.name;
    let position = {
      lat: event.location.coordinates[1],
      lng: event.location.coordinates[0]
    };
    var pin = new google.maps.Marker({ position, map, title  });
    markers.push(pin);
  });
  // Store Ironhack's coordinates
 var ironhackBCN = { lat: 41.3977381,  lng: 2.190471916 };

 // Map initialization
 var map = new google.maps.Map(document.getElementById('map'), {
   zoom: 15,
   center: center
 });

 if (navigator.geolocation) {
   navigator.geolocation.getCurrentPosition(function (position) {
     const user_location = {
       lat: position.coords.latitude,
       lng: position.coords.longitude
     };

     // Center map with user location
     map.setCenter(user_location);

     // Add a marker for your user location
     var userMarker = new google.maps.Marker({
       position: {
         lat: user_location.lat,
         lng: user_location.lng
       },
       map: map,
       title: "You are here"
     });

   }, function () {
     console.log('Error in the geolocation service.');
   });
 } else {
   console.log('Browser does not support geolocation.');
 }
}



);
