export {};
const GroupChat = require('../models/groupChat.model');
const User = require('../models/user.model');

interface iGroupChat {
  _id: string,
  usersLastNames: Array<string>,
  usersId: Array<string>  
}


class GroupChatsService {

  addGroupChat = async (data: iGroupChat) => {
    try {      
      const newGroupChat = new GroupChat(data);
      await newGroupChat.save()
      await User.updateMany({_id: data.usersId}, {$push: {groupChats: data._id} })
      return {
        message: 'Groupchat has been created...'
      }
    } catch(e) {
      console.log(e)
    }
  };

  getGroupChatsById = async (id: string) => {
    try {      
      const user = await User.findById(id);      
      return await GroupChat.find({_id: user.groupChats})
    } catch(e) {
      console.log(e)
    }
  };

  leftChat = async (chatId: string, userId: string, userLastName: string) => {
    const chat = await GroupChat.findById(chatId);    
    await GroupChat.updateOne(
        {_id: chatId}, 
        {
          usersId: chat.usersId.filter((id: string) => id != userId),
          usersLastNames: chat.usersLastNames.filter((lastName: string) => lastName !== userLastName)        
        }
    )
    const user = await User.findById(userId);
    await User.updateOne({_id: userId}, {groupChats: user.groupChats.filter((id: string) => id !== chatId)})
    return {
      message: 'Updated...'
    }        
  }
}
module.exports = GroupChatsService;