/*jshint esversion: 6*/
const express = require('express');
const GitHub  = require('github-api');
const Repo    = require('../models/repositories');
const User = require('../models/user');


const router = express.Router();

router.get("/", ensureAuthenticated, (req, res) => {
  // Get Github repositories
  console.log("ha llegado");
  var gh = new GitHub({
   username: req.user.username,
   token:    req.user.token
 });
 //console.log(userInfo(gh.username));
 // me = gh.getUser();
 //  me.listRepos((err, privateRepos) => {
 //    res.render("repositories/index", {
 //      username: req.user.username,
 //      user: req.user,
 //      privateRepos
 //    });
 //  });
 User.find({},(err,users) =>{
   if (err) {
     throw err;
   }
   console.log(users);
   res.render('repositories/index', {users});
 }
);
//console.log("User is: "+ me);
});

router.post('/publish/:repoId', function(req,res){
  //take request parameters from our body
  let repo = new Repo({
    githubId:    req.body.id,
    user_id:     req.user._id,
    name:        req.body.name,
    url:         req.body.url,
    description: req.body.desc,
  });
//using the repo model, prevent inserting twice the same repo
  Repo.find({'githubId': repo.githubId}, (err, repos) => {
    if (err) { res.status(500).send('Something broke!'); }
    if (!repos.length) {
      repo.save(repo, (err) => {
        if (err) { res.status(500).send('Something broke!'); }
        res.status(200).send('Repo Added!');
      });
    } else {
      res.status(200).send('Repo Was already Added!');
    }
  });
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }

  res.redirect('/');
}

module.exports = router;
