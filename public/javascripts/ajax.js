/*jshint esversion: 6*/
function userInfo(username){
  console.log("llego" + username);
$.ajax({
  url: "https://api.github.com/users/"+username,
  method: "GET",

  success: function (response) {
    $('.user-info').remove();
    let keys = Object.keys(response);
    keys.forEach(function(l){
      if (response[l] !== null) {
          $('#repositories').append( `<p class='user-info'>${l} ${response[l]}</p>` );
      }


    });

    console.log(response);
    return response;
  },
  error: function (err) {
    return err;
    },
});
}
