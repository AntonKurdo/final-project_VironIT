export{}
const graphql = require('graphql');
const { GraphQLJSON } = require('graphql-type-json');
const {GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList} = graphql;

// TYPES
const PostType = require('./types/PostType');
const CommentType = require('./types/CommentType');

// MODELS
const User = require('../models/user.model');
const Post = require('../models/post.model');
const Comment = require('../models/comment.model');
const GroupChat = require('../models/groupChat.model');


const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addNewPost: {
      type: PostType,
      args: {
        title: {type: GraphQLString},
        text: {type: GraphQLString},
        picture: {type: GraphQLString},
        video: {type: GraphQLString},
        owner: {type: GraphQLID}
      },
      async resolve(parent: any, args: any) {
        try {
          const { title, text, picture, owner, video } = args;
          const post = new Post({
            title,
            text, 
            picture, 
            owner,
            video
          });
          return await post.save();          
        } catch(e) {
          console.log(e)
        }  
      }
    },
    likePostById: {
      type: PostType,
      args: {
        postId: {type: GraphQLID},
        userId: {type: GraphQLID}
      },
      async resolve(parent: any, args: any) {
        try {   
          const post = await Post.findOne({_id: args.postId});  
          const isAlreadyLiked = post.likes.indexOf(args.userId);
          if(isAlreadyLiked === -1) {
            await Post.updateOne({_id: args.postId}, {likes: [...post.likes, args.userId]}, {new: true})
          } else {
            await Post.updateOne({_id: args.postId}, {likes: post.likes.filter((item: any) => item != args.userId)})
          }   
          return await Post.findOne({_id: args.postId});         
        } catch(e) {
          console.log(e)
        }
      }
    },
    addNewComment: {
      type: CommentType,
      args: {
        postId: {type: GraphQLID},
        userId: {type: GraphQLID},
        userName: {type: GraphQLString},
        userAva: {type: GraphQLString},
        text: {type: GraphQLString}
      },
      async resolve(parent: any, args: any) {      
        try {
          const newComment = new Comment(args);      
          return await newComment.save();         
        }
        catch(e) {
            console.log(e)
        }
      }
    },
    addFriend: {
      type: GraphQLJSON,
      args: {
        newFriendId: {type: GraphQLID},
        userId: {type: GraphQLID}        
      },
      async resolve(parent: any, args: any) {              
        try {
          const {userId, newFriendId} = args;
          const user = await User.findOne({_id: userId}); 
          const alreadyFriend = user.friends.indexOf(newFriendId);   
          if(alreadyFriend === -1) {
            await User.updateOne({_id: userId}, {friends: [...user.friends, newFriendId]});   
            return {
              status: 'ok',
              message: 'New friend was added...'
            }        
          } else {    
            return {
              status: 'error',
              message: 'You are already friends...'
            };            
          }     
        } catch(e) {
          console.log(e)
        }
      }
    },
    removeFriend: {
      type: GraphQLJSON,
      args: {
        friendId: {type: GraphQLID},
        userId: {type: GraphQLID}        
      },
      async resolve(parent: any, args: any) {              
        try {
          const {friendId, userId} = args;
          const user = await User.findById(userId);
          const removingFriend = await User.findById(friendId);
          await User.updateOne({_id: userId}, {friends: user.friends.filter((friend: string) => friend != friendId)})
          return {
            status: 'ok',
            message: `${removingFriend.first_name} ${removingFriend.last_name} has been removed from Your friends...`
          };
        } catch(e) {
          console.log(e)
        }
      }
    },
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

  }
});

module.exports = Mutation;