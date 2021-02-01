export {};
const mongoose = require('mongoose');

const schm = new mongoose.Schema({
  postId: {type: mongoose.Types.ObjectId, required: true, ref: 'Post'},
  userId: {type: mongoose.Types.ObjectId, required: true, ref: 'User'},
  userName: {type: String, required: true},
  userAva: {type: String, required: true},  
  date: {type: Date, default: Date.now()},
  text: {type: String, required: true}
});

module.exports = mongoose.model('Comment', schm);