/*jshint esversion: 6*/
const express = require('express');
const GitHub = require('github-api');
const Repo = require('../models/repositories');
const User = require('../models/user');


const router = express.Router();

router.get("/", ensureAuthenticated, (req, res) => {
    // Get Github repositories
    console.log("ha llegado");
    var gh = new GitHub({
        username: req.user.username,
        token: req.user.token
    });

    User.find({}, (err, users) => {
        if (err) {
            throw err;
        }
        console.log(users);
        res.render('users/index', {
            users
        });
    });
});


function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/');
}

module.exports = router;
