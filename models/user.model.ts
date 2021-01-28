export {};
const mongoose = require('mongoose');

const schm = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },  
  posts: [{type: mongoose.Types.ObjectId, ref: 'Post'}]
});

module.exports = mongoose.model('User', schm);