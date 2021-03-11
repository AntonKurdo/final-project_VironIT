export{}
const graphql = require('graphql');
const {GraphQLObjectType} = graphql;

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
    }
  }
});

module.exports = RootMutation;