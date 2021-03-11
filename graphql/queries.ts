export {};
const graphql = require('graphql');
const {GraphQLObjectType} = graphql;

// QUERIES
const PostQuery = require('./queries/posts.query');
const FriendsQuery = require('./queries/friends.query');
const CommentsQuery = require('./queries/comments.query');
const ChatsQuery = require('./queries/chats.query');


const RootQuery = new GraphQLObjectType({
  name: 'Query',
  fields: {  
    posts: {
      type: PostQuery,
      resolve () {
        return 'ok'
      }
    },
    friends: {
      type: FriendsQuery,
      resolve () {
        return 'ok'
      }
    }, 
    comments: {
      type: CommentsQuery,
      resolve () {
        return 'ok'
      }
    }, 
    chats: {
      type: ChatsQuery,
      resolve () {
        return 'ok'
      }
    }  
  }
});


module.exports = RootQuery;