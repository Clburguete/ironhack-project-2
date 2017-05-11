//Api routes
/*jshint esversion: 6*/
const express = require('express');
const router = express.Router();
const Event = require('../../models/events.js');

router.get('/', (req, res, next) => {
  console.log('API working');
  res.send('API working');
});

router.get('/events/', (req, res, next) => {
  console.log('list all events');
  Event.find({}, (err, arrayEvents) => {
    res.json(arrayEvents);
  });
});

router.get('/events/:id', (req, res, next) => {
  console.log('read event by id');
  Event.findById(req.params.id, function (err, event) {
    res.json(event);
  });
});

router.get('/events/:id/join', (req, res, next) => {
  console.log('join event');
  Event.findById(req.params.id, function (err, event) {
    res.json(event);
  });
});

router.post('/events/new', (req, res, next) => {
  console.log(req.body.event);
  let location = {
    type: 'Point',
    coordinates: [3.6976, 40.3917]
  };

  // Create a new event with location
  const newEvent = JSON.parse(req.body.event);
  const event = new Event(newEvent);
  // Save the event to the Database
  event.save((error, ev) => {
    if (error) { console.log(error); }
    else {
      res.send(ev);
    }
  });
  console.log('create new event');
});



module.exports = router;
