export {};
const graphql = require('graphql');
const { GraphQLJSON } = require('graphql-type-json');
const {GraphQLObjectType,  GraphQLID, GraphQLString, GraphQLList} = graphql;

// MODELS
const User = require('../../models/user.model');
const Post = require('../../models/post.model');
const GroupChat = require('../../models/groupChat.model');



const ChatsMutations = new GraphQLObjectType({
  name: 'ChatsMutations',
  fields: () => ({
    addNewPersonalChatToUser: {
      type: GraphQLJSON,
      args: {
        userId: {type: GraphQLID},
        secondUserId: {type: GraphQLID}
      },
      async resolve(parent: any, args: any) {    
        try {
          const {userId, secondUserId} = args;
          const newChatId = `${userId}${secondUserId}`;
          const firstUser = await User.findById(userId);
          if(firstUser.personal_chats.includes(newChatId) || firstUser.personal_chats.includes(`${secondUserId}${userId}`)) {        
            return {
              status: 'ok'        
            };
          } else {
            await User.updateOne({_id: [userId]}, {$push: {personal_chats: newChatId}})
            await User.updateOne({_id: [secondUserId]}, {$push: {personal_chats: newChatId}})
            return {
              status: 'ok'        
            };
          }     
        } catch (e) {
          console.log(e)
        }
      }
    },
    archiveChat: {
      type: GraphQLJSON,
      args: {
        userId: {type: GraphQLID},
        chatId: {type: GraphQLString}
      },
      async resolve(parent: any, args: any) {  
        try {
          const {userId, chatId} = args;
          const user = await User.findById(userId);     
          await User.updateOne({_id: userId}, {
            personal_chats: user.personal_chats.filter((chat: string) => chat !== chatId),
            archived_chats: [...user.archived_chats, chatId]
          })
          return {
            message: 'ok'
          }
        } catch (e) {
          console.log(e)
        }
      }
    },
    unarchiveChat: {
      type: GraphQLJSON,
      args: {
        userId: {type: GraphQLID},
        chatId: {type: GraphQLString}
      },
      async resolve(parent: any, args: any) {  
        try {
          const {userId, chatId} = args;
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
    },
    addGroupChat: {
      type: GraphQLJSON,
      args: {
        _id: {type: GraphQLString},
        usersLastNames: {type: GraphQLList(GraphQLString)},
        usersId: {type: GraphQLList(GraphQLString)} 
      },
      async resolve(parent: any, args: any) {  
        try {      
          const newGroupChat = new GroupChat(args);
          await newGroupChat.save()
          await User.updateMany({_id: args.usersId}, {$push: {groupChats: args._id} })
          return {
            message: 'Groupchat has been created...'
          }
        } catch(e) {
          console.log(e)
        }
      }
    },
    leaveGroupChat: {
      type: GraphQLJSON,
      args: {
        chatId: {type: GraphQLString},
        userId: {type: GraphQLID},
        userLastName: {type: GraphQLString}
      },
      async resolve(parent: any, args: any) {  
        try {
          const {chatId, userId, userLastName} = args;
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
            message: 'User left the chat...'
          }        
        } catch (error) {
          console.log(error)
        }
      }
    },
  })
});

module.exports = ChatsMutations;