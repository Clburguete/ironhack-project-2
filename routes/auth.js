/*jshint esversion: 6*/
const passport       = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const User = require('../models/user');
require("dotenv").config();

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});
passport.deserializeUser(function(id, cb) {
  User.findById(id, function(err, user){
    cb(null, user);
  });
});

const GITHUB_CLIENT_ID     = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

//Initialize Github Strategy

passport.use(new GitHubStrategy({
    clientID:     GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
//lets declared outside conditional to fullfil scope
    let githubId = "", name= "", username= "", email= "", avatar= "";
    if (profile._json.id)         { githubId = profile._json.id; }
    if (profile._json.name)       { name     = profile._json.name; }
    if (profile._json.login)      { username = profile._json.login; }
    if (profile._json.email)      { email    = profile._json.email; }
    if (profile._json.avatar_url) { avatar   = profile._json.avatar_url; }

    let newUser = new User({
      token: accessToken,
      githubId,
      name,
      username,
      email,
      avatar
    });


    User.findOrCreate({githubId:newUser.githubId},
      { username: newUser.username,
        name: newUser.name,
        avatar: newUser.avatar,
      },
       function (err, user) {
         return done(err, user);
    });
  }
));


module.exports = passport;
