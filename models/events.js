/*jshint esversion: 6*/
//Modifications of model
const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

const EventSchema = mongoose.Schema({
  location: { type: { type: String }, coordinates: [Number] },
    members: [mongoose.Schema.ObjectId],
    from: Date,
    to: Date,
    name: String,
    description: String,
});
EventSchema.index({ location: '2dsphere' });
EventSchema.plugin(findOrCreate);
const Event = mongoose.model('Event', EventSchema);

module.exports = Event;
