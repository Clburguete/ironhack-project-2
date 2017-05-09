/*jshint esversion: 6*/
$(document).ready(function() {
    const center = {
        lat: 40.417080,
        lng: -3.703612
    };



    let markers = [];
    // myEvents.forEach(function(event) {
    //     let title = event.name;
    //     let position = {
    //         lat: event.location.coordinates[1],
    //         lng: event.location.coordinates[0]
    //     };
    //     let pin = new google.maps.Marker({
    //         position,
    //         map,
    //         title
    //     });
    //     markers.push(pin);
    // });


    // Map initialization
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: center
    });
    const input = $('#places');


    let autocomplete = new google.maps.places.Autocomplete(input[0]);

    function setMapOnAll(map) {
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(map);
        }
    }

    function clearMarkers() {
        setMapOnAll(null);
    }

    autocomplete.bindTo('bounds', map);
    $('form[action="/maps"]').on('submit', function(e) {
        e.preventDefault();
        $(".status").addClass("clickedstatus");

        clearMarkers();
        let latitude = autocomplete.getPlace().geometry.location.lat();
        let longitude = autocomplete.getPlace().geometry.location.lng();

        var newMarker = new google.maps.Marker({
            position: {
                lat: latitude,
                lng: longitude
            },
            map: map,
            title: $("#name").val()
        });
        markers.push(newMarker);

        const EventForm = {
            name: $("#name").val(),
            description: $("#description").val(),
          //  members: document.cookie.session.user,
            lat: latitude,
            lng: longitude

        };

        map.setCenter(newMarker.position);
        //ajax post, sending EventForm
        $.ajax({
            method: 'POST',
            url: '/maps',
            data: EventForm,
            success: function() {
                console.log(EventForm);
                console.log(document.cookie);
            },
            error: function() {
                console.log("ERROR");
            }
        });
    });



    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const user_location = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            // Center map with user location
            map.setCenter(user_location);


        }, function() {
            console.log('Error in the geolocation service.');
        });
    } else {
        console.log('Browser does not support geolocation.');
    }

});
