export {};
const graphql = require('graphql');
const { mapAsync } = require('lodasync');
const {GraphQLObjectType,  GraphQLID, GraphQLList} = graphql;

// TYPES 
const PersonalChatType = require('../types/PersonalChatType');
const GroupChatType = require('../types/GroupChatType');

// MODELS
const User = require('../../models/user.model');
const PersonalChat = require('../../models/chat.model');
const GroupChat = require('../../models/groupChat.model');


const ChatsQuery = new GraphQLObjectType({
  name: 'ChatsQuery',
  fields: () => ({
    getAllPersonalChatsByUserId: {
      type: GraphQLList(PersonalChatType),
      args: {userId: {type: GraphQLID}},
      async resolve(parent: any, args: any) {
        try {      
          const user = await User.findById(args.userId);
          const chats = await PersonalChat.find({_id: user.personal_chats})
          const ids = chats.map((item: any) => {
            return {
              userId: item.usersId.filter((uid: string) =>  uid != args.userId)[0],
              chatId:item._id
            }
          }); 
          return await mapAsync(async(el: any) => {
            const user = await User.findById(el.userId);
            return {
              _id: user._id,      
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
    },
    getArchivedChatsById: {
      type: GraphQLList(PersonalChatType),
      args: {userId: {type: GraphQLID}},
      async resolve(parent: any, args: any) {
        try {   
          const user = await User.findById(args.userId);
          const chats = await PersonalChat.find({_id: user.archived_chats})
          const ids = chats.map((item: any) => {
            return {
              userId: item.usersId.filter((uid: string) =>  uid != args.userId)[0],
              chatId:item._id
            }
          }); 
          return await mapAsync(async(el: any) => {
            const user = await User.findById(el.userId);
            return {
              _id: user._id,      
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
    },
    getGroupChatsById: {
      type: GraphQLList(GroupChatType),
      args: {userId: {type: GraphQLID}},
      async resolve(parent: any, args: any) {
        try {      
          const user = await User.findById(args.userId);      
          return await GroupChat.find({_id: user.groupChats});
        } catch(e) {
          console.log(e)
        }
      }
    }
  })
})



module.exports = ChatsQuery;