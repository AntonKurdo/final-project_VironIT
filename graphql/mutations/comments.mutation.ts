export {};
const graphql = require('graphql');
const {GraphQLObjectType,  GraphQLID, GraphQLString} = graphql;

// TYPES 
const CommentType = require('../types/CommentType');

// MODELS
const Comment = require('../../models/comment.model');


const CommentsMutation = new GraphQLObjectType({
  name: 'CommentsMutation',
  fields: () => ({
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
  })
});

module.exports = CommentsMutation;