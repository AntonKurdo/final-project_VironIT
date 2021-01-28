export {};
const mongoose = require('mongoose');

const schm = new mongoose.Schema({
  title: {type: String, required: true},
  text: {type: String, required: true},
  picture: {type: String},
  video: {type: String},
  date: {type: Date, default: Date.now()},
  likes: {type: Number, default: 0},
  isFavourite: {type: Boolean, default: false},
  owner: [{type: mongoose.Types.ObjectId, required: true, ref: 'User'}]
});

module.exports = mongoose.model('Post', schm);