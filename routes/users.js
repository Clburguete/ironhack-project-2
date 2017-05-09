/*jshint esversion: 6*/
const express = require('express');
const GitHub = require('github-api');
const User = require('../models/user');


const router = express.Router();

router.get("/", ensureAuthenticated, (req, res) => {
    // Get Github repositories
    var gh = new GitHub({
        username: req.user.username,
        token: req.user.token
    });

    User.find({}, (err, users) => {
        if (err) {
            throw err;
        }
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
