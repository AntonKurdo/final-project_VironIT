export {};
const User = require('../models/user.model');

class ProfileService {

  changeAvatar = async (userId: string, newAva: string) => {
    try {
      await User.updateOne({_id: userId}, {avatar: newAva});
      return {message: 'Avatar updated'}
    } catch(e) {
      console.log(e)
    }
  };
}
module.exports = ProfileService;