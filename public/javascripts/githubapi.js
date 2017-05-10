/*jshint esversion: 6*/
class GitHubApi {
    constructor(baseURL) {
        this.BASE_URL = baseURL;
        this.languagesArray = [];
    }

    getUserInfo(username) {
      return new Promise ((resolve,reject)=>{
        $.ajax({
            url: this.BASE_URL + username,
            method: "GET",

            success: function(response) {
                $('.user-info').remove();
                //let keys = Object.keys(response);
                // keys.forEach(function(l) {
                //      if (response[l] !== null) {
                //         $('#repositories').append(`<p class='user-info'>${l} ${response[l]}</p>`);
                //      }
                //
                //
                // });

                console.log(response);
                resolve (response);
            },
            error: function(err) {
                return err;
            },
        });
      });

    }

    _getLanguages(repoUrl) {
      return new Promise((resolve,reject) =>{
        $.ajax({
            url: repoUrl + "/languages",
            method: "GET",
            success: (response) => {
                resolve(response);
            }
        });
      });
    }
    getRepoLanguages(username) {
      let languages = {};
        return new Promise((resolve,reject) =>{
          $.ajax({
              url: this.BASE_URL + username + '/repos',
              method: "GET",
              success: (response) => {
                  let promisesArray = response.map((repo) => this._getLanguages(repo.url));
                  Promise.all(promisesArray).then((responses) => {
                    console.log("All promises completed");
                    //console.log(responses);
                    responses.forEach(function(repo){
                      Object.keys(repo).forEach( function (key) {
                        if (languages[key]) {
                          languages[key] += repo[key];
                        } else {
                          languages[key] = repo[key];
                        }
                      });
                    });

                    resolve(languages);

                  });
              },
              error: function(err) {
                  return err;
              },

          });
        });


    }
}
