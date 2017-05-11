/* jshint esversion:6 */
$(document).ready(function(){

  function joinEvent() {
    var url = document.location.origin;
    var id = $(this)[0].parentElement.id;
    $.ajax({
      method: 'GET',
      url: url+'/api/events/'+id+'/join',
      success: function(data) {
        console.log(data);
      }
    });
  }

  function createCard(event) {
    var languagesChips = '';
    event.languages.forEach(function(elem) {
      languagesChips += '<div class="chip">'+elem+'</div>';
    });
    $('.collection').append(
          '<li id="'+ event._id +'" class="collection-item event-card">' +
          '<h4 class="event-card__name">'+event.name+'</h4>' +
          '<div class="event-card__languages">'+languagesChips+'</div>' +
          '<div class="event-card__date"><span>'+event.from.substring(0, event.from.indexOf('T'))+'</span>' +
          '<span>'+event.to.substring(0, event.to.indexOf('T'))+'</span></div>' +
          '<div class="event-card__buttons"><a href="/events/'+event._id+'" class="waves-effect waves-light btn">View More</a>' +
          '<a class="waves-effect waves-light btn join_event">Join</a></div>' +
          '</li>');
  }

  function test() {
      var url = document.location.origin;

      $.ajax({
        method: 'GET',
        url: url+'/api/events',
        success: function(data) {
          data.forEach(function(elem){
            createCard(elem);
          });
          $('.join_event').on('click', joinEvent);
          createMapazo(data);
          console.log(data);
        }
      });





    }

    test();

function createMapazo(arr) {
  var center = {
      lat: 40.417080,
      lng: -3.703612
  };



  var markers = [];
  arr.forEach(function(event) {
      var title = event.name;
      var position = {
          lat: event.location.coordinates[0],
          lng: event.location.coordinates[1]
      };
      var pin = new google.maps.Marker({
          position: position,
          map: mapazo,
          title: title
      });
      markers.push(pin);
  });


  // Map initialization
  var mapazo = new google.maps.Map(document.getElementById('mapazo'), {
      zoom: 15,
      center: center
  });

      for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(mapazo);
      }

console.log(markers);
  // function clearMarkers() {
  //     setMapOnAll(null);
  // }
}



});
