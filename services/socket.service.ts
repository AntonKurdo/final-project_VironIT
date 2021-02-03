export {};
const Chat = require('../models/chat.model');
const Message = require('../models/message.model');

const socketStart = async (io: any) => {
  try {
    io.on("connection", (socket: any) => {        
      socket.on("chat message", async (msg: {content: string, authorFullName?: string}, fromId: string, toId: string) => {       
        const chat = await Chat.findOne({$or: [{_id: `${fromId}${toId}`}, {_id: `${toId}${fromId}`}]});  
        let messages: any = [];    
        if(!chat) {
          const newChat = new Chat({
            _id: `${fromId}${toId}`,
            usersId: [fromId, toId]
          })
          await newChat.save()
        }        
        if(msg.content !== 'start') {     
           const {authorFullName, content} = msg;
           const newMessage = new Message({
            authorId: fromId,
            authorFullName,
            content,
            chatId: chat.id || `${fromId}${toId}`
          })
          await newMessage.save();
          const msgs = chat 
                          ? await Message.find({chatId: chat.id})
                          : await Message.find({chatId: `${fromId}${toId}`})
          messages = [...messages, ...msgs]
          io.emit("chat message", JSON.stringify(messages));
        } else {  
          const msgs = chat 
                        ? await Message.find({chatId: chat.id})
                        : await Message.find({chatId: `${fromId}${toId}`})
          messages = [...messages, ...msgs]
          io.emit("chat message", JSON.stringify(messages));
        }
     
      });   
    });

  } catch(e) {
    console.log(e)
  }
}

module.exports = socketStart;