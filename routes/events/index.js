//Events routes
/*jshint esversion: 6*/
const express = require('express');
const router = express.Router();
const Event = require('../../models/events.js');

router.get('/', (req, res, next) => {
  res.render('events/dashboard.ejs', {layout: 'layouts/events'});
});

router.get('/:id', (req, res, next) => {

  Event.findById(req.params.id, {_id: 0}).populate('members', 'username').exec((err, event) => {
   console.log(event);
   res.render('events/single.ejs', { data: JSON.stringify(event) });
 });

});


module.exports = router;
