export {};
const Chat = require('../models/chat.model');
const User = require('../models/user.model');
const { mapAsync } = require('lodasync');

class PersonalChatsService {

  getChatsById = async (id: string) => {    
    try {      
      const user = await User.findById(id);
      const chats = await Chat.find({_id: user.personal_chats})
      const ids = chats.map((item: any) => {
        return {
          userId: item.usersId.filter((uid: string) =>  uid != id)[0],
          chatId:item._id
        }
      }); 
      return await mapAsync(async(el: any) => {
        const user = await User.findById(el.userId);
        return {
          id: user._id,      
          chat_id: el.chatId,
          firstName: user.first_name,
          lastName: user.last_name,
          avatar: user.avatar 
        }
      }, ids)          
    } catch(e) {
      console.log(e)
    }
  };
  
  addNewPersonalChatToUser = async (userId: string, secondUserId: string) => {   
    try {
      const newChatId = `${userId}${secondUserId}`;
      const firstUser = await User.findById(userId);
      if(firstUser.personal_chats.includes(newChatId) || firstUser.personal_chats.includes(`${secondUserId}${userId}`)) {        
        return {
          status: 'ok'        
        }
      } else {
        await User.updateOne({_id: [userId]}, {$push: {personal_chats: newChatId}})
        await User.updateOne({_id: [secondUserId]}, {$push: {personal_chats: newChatId}})
        return {
          status: 'ok'        
        }
      }     
    } catch (e) {
      console.log(e)
    }
  }
  
}
module.exports = PersonalChatsService;