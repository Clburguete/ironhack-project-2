/*jshint esversion: 6*/
//Modifications of model
const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

const EventSchema = mongoose.Schema({
  location: { type: { type: String }, coordinates: [Number] },
    members: [mongoose.Schema.ObjectId],
    from: {type: Date},
    to: {type: Date},
    name: String,
    description: String,
    languages: [String],
});
EventSchema.index({ location: '2dsphere' });
EventSchema.plugin(findOrCreate);
const Event = mongoose.model('Event', EventSchema);

module.exports = Event;
