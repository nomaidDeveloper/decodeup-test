const mongoose = require('mongoose');
const Schema = mongoose.Schema
const EventSchema = new Schema({
    eventName: String,
    eventTitle: String,
    eventDescription: String,
    eventLocation: String,
    eventDate: Date,
    images: [String],
},
    { timestamps: true }
)
let Events = mongoose.model('event', EventSchema);

module.exports = Events;