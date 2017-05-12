/*jshint esversion: 6*/
class GitHubApi {
    constructor(baseURL) {
        this.BASE_URL = baseURL;
        this.languagesArray = [];
    }

    getUserInfo(username) {
      return new Promise ((resolve,reject)=>{
        $.ajax({
            url: this.BASE_URL + username+"?access_token=ffaa6ee8e44d805b5ff3234f656e7daec74db0b0",

            method: "GET",

            success: function(response) {
                $('.user-info').remove();
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
            url: repoUrl + "/languages"+"?access_token=ffaa6ee8e44d805b5ff3234f656e7daec74db0b0",

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

              url: this.BASE_URL + username + '/repos'+"?access_token=ffaa6ee8e44d805b5ff3234f656e7daec74db0b0",

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
