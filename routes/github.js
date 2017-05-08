/*jshint esversion: 6*/
var express = require('express');
var router = express.Router();
const passport       = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
// Passport Routes Configuration
router.get('/',
  passport.authenticate('github', { scope: [ 'user:email' ] }));

router.get('/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/repositories');
  });
  router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});
module.exports = router;
