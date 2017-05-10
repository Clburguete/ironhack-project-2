/*jshint esversion: 6*/
const express = require('express');
const router = express.Router();
const Event = require('../models/events.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/maps',ensureAuthenticated,function(req,res,next){
  Event.find({},{"members":0},(error,events)=>{
    if (error) { next(error); }
  else{
    res.render('maps',{events: JSON.stringify(events)});
  }});

});
router.get('/createevent',ensureAuthenticated,(req,res) =>{
  res.render('createEvent');
});
router.post('/maps',(req, res, next) => {
//  Get Params from POST
  let location = {
    type: 'Point',
    coordinates: [req.body.lng, req.body.lat]
  };

  // Create a new event with location
    const newEvent = {
      name:        req.body.name,
      description: req.body.description,
      location:    location,
      members: [req.user._id]
    };
const event = new Event(newEvent);
  // Save the event to the Database
  event.save((error) => {
    if (error) { console.log(error); }
    else {
      res.redirect('/maps');
    }
  });
});

// router.get('/events/all',(req, res, next) =>{
//   Event.find({}, (events) => {
//     res.type('application/json');
//     res.send(events);
//   });
// });

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/');
}
module.exports = router;
