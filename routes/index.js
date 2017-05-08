/*jshint esversion: 6*/
const express = require('express');
const router = express.Router();
const Event = require('../models/events.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/maps',function(req,res){
  res.render('maps');
});
router.get('/createevent',(req,res) =>{
  res.render('createEvent');
});
router.post('/maps',(req, res, next) => {
  // Get Params from POST
  let location = {
    type: 'Point',
    coordinates: [req.body.longitude, req.body.latitude]
  };

  // Create a new event with location
    const newEvent = {
      name:        req.body.name,
      description: req.body.description,
      location:    location
    };
console.log(newEvent);
const event = new Event(newEvent);
  // Save the event to the Database
  event.save((error) => {
    if (error) { console.log(error); }
    else {
      res.redirect('/maps');
    }
  });
});

module.exports = router;
