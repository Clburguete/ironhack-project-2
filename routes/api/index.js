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
  Event.find({}).populate('members').exec((err, arrayEvents) => {
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
  console.log(req.user._id);
  Event.findById(req.params.id, (err, event) => {
    if (event.members.indexOf(req.user._id) === -1) {
      console.log("entra");
      Event.update({ _id: req.params.id }, { $push: { members: req.user._id }},(err, event)=>{
        console.log(event);

      });
    }
    res.json(event);
  });
});

router.post('/events/new', (req, res, next) => {
  console.log(req.body.event);
  console.log(req.user._id);
  // Create a new event with location
  const newEvent = JSON.parse(req.body.event);
  const event = new Event(newEvent);
  event.members.push(req.user._id);
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
