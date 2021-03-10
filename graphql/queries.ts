export {};
const graphql = require('graphql');
const { mapAsync } = require('lodasync');
const {GraphQLObjectType,  GraphQLID, GraphQLList} = graphql;

// TYPES 
const UserType = require('./types/UserType');
const PostType = require('./types/PostType');
const PersonalChatType = require('./types/PersonalChatType');
const CommentType = require('./types/CommentType');
const GroupChatType = require('./types/GroupChatType');

// MODELS
const User = require('../models/user.model');
const Post = require('../models/post.model');
const Comment = require('../models/comment.model');
const PersonalChat = require('../models/chat.model');
const GroupChat = require('../models/groupChat.model');


const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    user: {
      type: UserType,
      args: {id: {type: GraphQLID}},
      resolve (parend: any, args: any) {
        return  User.findById(args.id)
      }
    },
    getAllUsers: {
      type: GraphQLList(UserType),    
      resolve (parent: any, args: any) {     
        return User.find({})
      }
    },
    post: {
      type: PostType,
      args: {id: {type: GraphQLID}},
      resolve(parentL: any, args: any) {
        return Post.findById(args.id)
      }
    },
    getUserPostsById: {
      type: GraphQLList(PostType),
      args: {userId: {type: GraphQLID}},
      resolve(parent: any, args: any) {
        return Post.find({owner: args.userId})
      }
    },
    getNews: {
      type: GraphQLList(PostType),
      args: {userId: {type: GraphQLID}},
      async resolve(parent: any, args: any) {
        try {
          const user = await User.findById(args.userId);             
          const friendsPosts = await Post.find({owner: user.friends});          
          return friendsPosts;
        } catch(e) {
          console.log(e)
        } 
      }
    },
    getCommentsByPostId: {
      type: GraphQLList(CommentType),
      args: {postId: {type: GraphQLID}},
      async resolve(parent: any, args: any) {
        try {
          return await Comment.find({postId: args.postId});        
        } catch(e) {
          console.log(e)
        }
      }
    },
    getAllFriendsByUserId: {
      type: GraphQLList(UserType),
      args: {userId: {type: GraphQLID}},
      async resolve(parent: any, args: any) {
        try {
          const user = await User.findOne({_id: args.userId});    
          if(user.friends.length !== 0) {
            return await User.find({_id: [
              ...user.friends
            ]})             
          } 
          return [];
        } catch(e) {      
          console.log(e)
        }
      }
    },
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
  }
});


module.exports = Query;