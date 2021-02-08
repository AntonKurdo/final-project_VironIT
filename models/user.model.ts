export {};
const mongoose = require('mongoose');

const schm = new mongoose.Schema({
  first_name: {type: String, required: true}, 
  last_name: {type: String, required: true}, 
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, 
  avatar: {type: String, default: 'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png'},  
  friends : [{type: mongoose.Types.ObjectId, required: true, ref: 'User'}],
  personal_chats: [{type: String, ref: 'Chat'}],
  groupChats: [{type: String, unique: true, required: true, ref: 'GroupChat'}]
});

module.exports = mongoose.model('User', schm); 