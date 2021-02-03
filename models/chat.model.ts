export {};
const mongoose = require('mongoose');

const schm = new mongoose.Schema({
  _id: {type: String, primaryKey: true, required: true},  
  usersId: [{type: mongoose.Types.ObjectId, required: true, ref: 'User'}], 
  date: {type: Date, default: Date.now()}  
});

module.exports = mongoose.model('Chat', schm);