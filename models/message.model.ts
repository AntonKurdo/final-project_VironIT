export {};
const mongoose = require('mongoose');

const schm = new mongoose.Schema({
  content: {type: String, required: true},
  chatId: {type: String, required: true, ref: 'Chat'}, 
  authorId: {type: mongoose.Types.ObjectId, required: true, ref: 'User'},
  authorFullName: {type: String, required: true},
  date: {type: Date, default: Date.now()}
});

module.exports = mongoose.model('Message', schm);