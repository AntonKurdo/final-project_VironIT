export {};
const Chat = require('../models/chat.model');
const Message = require('../models/message.model');

const socketStart = async (io: any) => {
  try {
    io.on("connection", (socket: any) => {   
      console.log('connected')

      socket.on('open chat', async (fromId: string, toId: string) => {    
        try {
          const chat = await Chat.findOne({$or: [{_id: `${fromId}${toId}`}, {_id: `${toId}${fromId}`}]});       
          if(chat) {      
            socket.join(chat._id);       
            io.emit("get message", JSON.stringify(await Message.find({chatId: chat._id})));
          } else {
            const newChat = new Chat({
              _id: `${fromId}${toId}`,
              usersId: [fromId, toId]
            })
            await newChat.save();
            socket.join(`${fromId}${toId}`);  
            io.emit("get message", JSON.stringify([]));
          }         
        } catch (e) {
          console.log(e)
        }
      })  

      socket.on("chat message", async (msg: {content: string, authorFullName: string, date: Date}, fromId: string, toId: string) => {       
        try {
          const chat = await Chat.findOne({$or: [{_id: `${fromId}${toId}`}, {_id: `${toId}${fromId}`}]});           
          const {authorFullName, content, date} = msg;
          const newMessage = new Message({
              authorId: fromId,
              authorFullName,
              content,
              chatId: chat._id,
              date
          });
          await newMessage.save();         
          io.to(chat._id).emit("recieve chat message", JSON.stringify(msg));                     
        } catch (e) {
          console.log(e);
        }       
      });

      socket.on('disconnect', () => console.log('disconnected')); 
    });
  } catch(e) {
    console.log(e)
  }
}

module.exports = socketStart;