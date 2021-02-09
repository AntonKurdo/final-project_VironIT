export {};
const Chat = require('../models/chat.model');
const User = require('../models/user.model');
const { mapAsync } = require('lodasync');

class ArchivedChatsService {

  getArchivedChatsById = async (id: string) => {
    try {   
      const user = await User.findById(id);
      const chats = await Chat.find({_id: user.archived_chats})
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
  }

  archiveChat = async (userId: string, chatId: string) => {
    try {
      const user = await User.findById(userId);     
      await User.updateOne({_id: userId}, {
        personal_chats: user.personal_chats.filter((chat: string) => chat !== chatId),
        archived_chats: [...user.archived_chats, chatId]
      })
      return {
        status: 'ok'
      }
    } catch (e) {
      console.log(e)
    }
  }

  unarchiveChat = async (userId: string, chatId: string) => {
    try {
      const user = await User.findById(userId);
      await User.updateOne({_id: userId}, {
        personal_chats: [...user.personal_chats, chatId],
        archived_chats: user.archived_chats.filter((chat: string) => chat !== chatId),
      })
      return {
        status: 'ok'
      }
    } catch (e) {
      console.log(e)
    }
  }
 

  
}
module.exports = ArchivedChatsService;