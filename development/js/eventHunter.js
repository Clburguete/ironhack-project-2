
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
          console.log(data);
        }
      });





    }

    test();

});
