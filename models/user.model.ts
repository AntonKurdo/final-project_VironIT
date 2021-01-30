export {};
const mongoose = require('mongoose');

const schm = new mongoose.Schema({
  first_name: {type: String, required: true}, 
  last_name: {type: String, required: true}, 
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, 
  avatar: {type: String, default: 'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png'}, 
  posts: [{type: mongoose.Types.ObjectId, ref: 'Post'}]
});

module.exports = mongoose.model('User', schm); 