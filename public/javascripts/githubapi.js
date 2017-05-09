/*jshint esversion: 6*/
class GitHubApi {
    constructor(baseURL) {
        this.BASE_URL = baseURL;
        this.languagesArray = [];
    }

    getUserInfo(username) {
        //console.log(username)
        $.ajax({
            url: this.BASE_URL + username,
            method: "GET",

            success: function(response) {
                $('.user-info').remove();
                let keys = Object.keys(response);
                keys.forEach(function(l) {
                    if (response[l] !== null) {
                        $('#repositories').append(`<p class='user-info'>${l} ${response[l]}</p>`);
                    }


                });

                console.log(response);
                return response;
            },
            error: function(err) {
                return err;
            },
        });
    }

    //GET /repos/:owner/:repo/languages
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
        $.ajax({
            url: this.BASE_URL + username + '/repos',
            method: "GET",
            success: (response) => {
                let promisesArray = response.map((repo) => this._getLanguages(repo.url));
                Promise.all(promisesArray).then((responses) => {
                  console.log("All promises completed");
                  console.log(responses);
                });
            },
            error: function(err) {
                return err;
            },

        });
    }
}
