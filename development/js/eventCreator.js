

function Location(lat, lng) {
  this.type = 'Point';
  this.coordinates = [lat, lng];
}

function Event(name, description, location, from, to) {
  this.name = name;
  this.description = description;
  this.location = location;
  this.members = [];
  this.languages = [];
  this.from = from;
  this.to = to;
}

//create location
//create event

//push members
//push languages

Event.prototype.save = function() {
  var url = document.location.origin;
  var jsonEvent = JSON.stringify(this);

  $.ajax({
    method: 'POST',
    url: url+'/api/events/new',
    data: {
      event: jsonEvent
    },
    success: function(data) {
      console.log(data);
      insertCard(data);
    }
  });

};

function insertCard(event) {
  var languagesChips = '';
  event.languages.forEach(function(elem) {
    languagesChips += '<div class="chip">'+elem+'</div>';
  });
  $('.collection').prepend(
        '<li id="'+ event._id +'" class="collection-item event-card" style="padding: 0px; opacity:0; height:0px; transition: all 1s ease; overflow: hidden">' +
        '<h4 class="event-card__name">'+event.name+'</h4>' +
        '<div class="event-card__languages">'+languagesChips+'</div>' +
        '<div class="event-card__date"><span>'+event.from.substring(0, event.from.indexOf('T'))+'</span>' +
        '<span>'+event.to.substring(0, event.to.indexOf('T'))+'</span></div>' +
        '<div class="event-card__buttons"><a href="/events/'+event._id+'" class="waves-effect waves-light btn">View More</a>' +
        '<a class="waves-effect waves-light btn join_event">Join</a></div>' +
        '</li>');
  setTimeout(function(){
      $('.collection > li:first-child').css('height', '160px').css('opacity', '1').css('padding', '');
  }, 100);

}



$(document).ready(function(){

  $('#createEvent').on('click', function(){
    var name = $('#createEvent__name').val();
    var location = $('#createEvent__location').val();
    var from = $('#createEvent__from').val();
    var to = $('#createEvent__to').val();
    var languages = $('#createEvent__languages > .chip');
    var description = $('#createEvent__description').val();

    var newLocation = new Location(autocomplete.getPlace().geometry.location.lat(), autocomplete.getPlace().geometry.location.lng());
    var newEvent = new Event(name, description, newLocation, from, to);

    languages.each(function(index){
      newEvent.languages.push(languages[index].firstChild.data);
    });
    newEvent.save();

    $(this).closest('form').find("input[type=text], textarea").val("");
    $(this).closest('form').find('#createEvent__languages > .chip').remove();
    $(this).closest('form').find('label.active').removeClass('active');

    map.setZoom(5);
    map.setCenter({
        lat: 40.415363,
        lng: -3.703612
    });
    markers[0].setMap(null);
    markers.pop();

  });

  $('.datepicker').pickadate({
    format: 'yyyy-mm-dd',
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15 // Creates a dropdown of 15 years to control year

  });

  $('.chips-autocomplete').material_chip({
    secondaryPlaceholder: 'Languages',
    autocompleteOptions: {
      data: {
        'Html': null,
        'Css': null,
        'Javascript': null,
        'Python': null,
        'Typescript':null,
        'Go!' : null,
        'PhP' : null,
        'Ruby' : null
      },
      limit: Infinity,
      minLength: 1
    }
  });

  var center = {
      lat: 40.415363,
      lng: -3.703612
  };



  var markers = [];

  // Map initialization
  var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 5,
      center: center
  });
  var input = $('#createEvent__location')[0];
  //
  //
  var autocomplete = new google.maps.places.Autocomplete(input);

  autocomplete.addListener('place_changed', function() {
    center.lat = autocomplete.getPlace().geometry.location.lat();
    center.lng = autocomplete.getPlace().geometry.location.lng();

    map.setZoom(13);
    map.setCenter(center);

    markers.pop();

    var newMarker = new google.maps.Marker({
        position: center,
        map: map
    });

    markers.push(newMarker);
  });





});
