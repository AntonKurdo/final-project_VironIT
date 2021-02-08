export {};
const mongoose = require('mongoose');

const schm = new mongoose.Schema({
  _id: {type: String, primaryKey: true, required: true},  
  usersId: [{type: mongoose.Types.ObjectId, required: true, ref: 'User'}], 
  usersLastNames: [{type: String, required: true}], 
  date: {type: Date, default: Date.now()}  
});

module.exports = mongoose.model('GroupChat', schm);