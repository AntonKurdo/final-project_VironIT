import { Z_FILTERED } from "zlib";

export {};
const Chat = require('../models/chat.model');
const User = require('../models/user.model');

class PersonalChatsService {

  getChatsById = async (id: string) => {    
    try {      
      const user = await User.findById(id);      
      const chats = await Chat.find({_id: user.personal_chats});      
      const ids = chats.map((item: any) => {
        return item.usersId.filter((uid: string) =>  uid != id)[0]
      });
      const chatsInfo = await User.find({_id: ids});
      return chatsInfo.map((user: any) => ({
        id: user._id,
        firstName: user.first_name,
        lastName: user.last_name,
        avatar: user.avatar 
      }));     
    } catch(e) {
      console.log(e)
    }
  };
  
}
module.exports = PersonalChatsService;