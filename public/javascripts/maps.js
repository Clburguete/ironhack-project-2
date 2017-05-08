/*jshint esversion: 6*/
$(document).ready(function(){
  const sol = {
    lat: 40.417080,
    lng: -3.703612
  };

const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: sol
  });
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

});
