export {};
const graphql = require('graphql');
const {GraphQLObjectType,  GraphQLID, GraphQLList} = graphql;

// TYPES 
const CommentType = require('../types/CommentType');

// MODELS
const Comment = require('../../models/comment.model');

const CommentsQuery = new GraphQLObjectType({
  name: 'CommentsQuery',
  fields: () => ({
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
  })
})



module.exports = CommentsQuery;