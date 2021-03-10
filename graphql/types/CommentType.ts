export{}
const graphql = require('graphql');
const GraphQLDate = require('graphql-date');
const {GraphQLObjectType, GraphQLString, GraphQLID} = graphql;

// TYPES
const UserType = require('./UserType');
const PostType = require('./PostType');

// MODELS
const User = require('../../models/user.model');
const Post = require('../../models/post.model');

const CommentType = new GraphQLObjectType({
  name: 'Comment',
  fields: () => ({
    _id: {type: GraphQLID},  
    date: {type: GraphQLDate},
    postId: {type: GraphQLID},
    userId: {type: GraphQLID},
    userName: {type: GraphQLString},
    userAva: {type: GraphQLString},
    text: {type: GraphQLString},
    ownerInfo: {
      type: UserType,      
      resolve(parent: any, args: any) {
        return User.findById(parent.userId)
      }
    },
    postInfo: {
      type: PostType,      
      resolve(parent: any, args: any) {
        return Post.findById(parent.postId)
      }
    }
  })
});

module.exports = CommentType;