export {};
const graphql = require('graphql');
const { mapAsync } = require('lodasync');
const {GraphQLObjectType,  GraphQLID, GraphQLList} = graphql;

// TYPES 
const UserType = require('../types/UserType');
const PostType = require('../types/PostType');
const PersonalChatType = require('../types/PersonalChatType');
const CommentType = require('../types/CommentType');
const GroupChatType = require('../types/GroupChatType');

// MODELS
const User = require('../../models/user.model');
const Post = require('../../models/post.model');
const Comment = require('../../models/comment.model');
const PersonalChat = require('../../models/chat.model');
const GroupChat = require('../../models/groupChat.model');


const FriendsQuery = new GraphQLObjectType({
  name: 'FriendsQuery',
  fields: () => ({
    getAllUsers: {
      type: GraphQLList(UserType),    
      resolve (parent: any, args: any) {     
        return User.find({})
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
  })
})



module.exports = FriendsQuery;