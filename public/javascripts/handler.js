/*jshint esversion: 6*/
const github = new GitHubApi("https://api.github.com/users/");

$(document).ready( () => {
  $('.userinfo').on('click', (e) => {
    const user = $(e.currentTarget).prev().html();
    github.getUserInfo(user);
  });

});
