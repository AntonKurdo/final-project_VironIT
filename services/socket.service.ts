export {};
const Chat = require('../models/chat.model');
const Message = require('../models/message.model');

interface iMessage {
  _id: string,
  date: Date,
  authorId: string,
  authorFullName: string,
  content: string,
  chatId: string
};

const socketStart = async (io: any) => {
  try {
    io.on("connection", (socket: any) => {   
      socket.on('open chat', async (fromId: string, toId: string) => {        
        const chat = await Chat.findOne({$or: [{_id: `${fromId}${toId}`}, {_id: `${toId}${fromId}`}]});       
        if(chat) {        
          io.emit("get message", JSON.stringify(await Message.find({chatId: chat._id})));
        } else {
          const newChat = new Chat({
            _id: `${fromId}${toId}`,
            usersId: [fromId, toId]
          })
          await newChat.save()
          io.emit("get message", JSON.stringify([]));
        }
      })  

      socket.on("chat message", async (msg: {content: string, authorFullName: string, date: Date}, fromId: string, toId: string) => {       
        const chat = await Chat.findOne({$or: [{_id: `${fromId}${toId}`}, {_id: `${toId}${fromId}`}]});           
        const {authorFullName, content, date} = msg;
        const newMessage = new Message({
            authorId: fromId,
            authorFullName,
            content,
            chatId: chat.id,
            date
        });
        await newMessage.save();      
        io.emit("recieve chat message", JSON.stringify(msg));         
      });   
    });
  } catch(e) {
    console.log(e)
  }
}

module.exports = socketStart;