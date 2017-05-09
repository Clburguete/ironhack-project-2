/*jshint esversion: 6*/
class GitHubApi {
  constructor(baseURL){
    this.BASE_URL = baseURL;
  }

  getUserInfo(username){
    //console.log(username)
    $.ajax({
      url: this.BASE_URL+username,
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
}
