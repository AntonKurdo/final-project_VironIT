export{}
const graphql = require('graphql');
const {GraphQLObjectType, GraphQLID, GraphQLString} = graphql;
const { GraphQLJSON } = require('graphql-type-json');
const User = require('../models/user.model')


// MUTATIONS
const PostMutation = require('./mutations/posts.mutation');
const CommentsMutation = require('./mutations/comments.mutation');
const FriendsMutation = require('./mutations/friends.mutation');
const ChatsMutations = require('./mutations/chats.mutation');

const RootMutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {   
    posts: {
      type: PostMutation,
      resolve() {
        return 'ok'
      }
    },  
    comments: {
      type: CommentsMutation,
      resolve() {
        return 'ok'
      }
    }, 
    friends: {
      type: FriendsMutation,
      resolve() {
        return 'ok'
      }
    },     
    chats: {
      type: ChatsMutations,
      resolve() {
        return 'ok'
      }
    },
    changeAvatar: {
      type: GraphQLJSON,
      args: {userId: {type: GraphQLID}, newAva: {type: GraphQLString}},
      async resolve(parents: any, args: any) {
        try {
          await User.updateOne({_id: args.userId},  {avatar: args.newAva});
          return {
            status: 'ok',
            message: 'Avatar has been updated...'
          }
        } catch (e) {
          console.log(e)
        }
      }
    }
  }
});

module.exports = RootMutation;