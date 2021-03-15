export {};
const graphql = require('graphql');
const { GraphQLJSON } = require('graphql-type-json');
const {GraphQLObjectType,  GraphQLID, GraphQLString} = graphql;

// TYPES 
const CommentType = require('../types/CommentType');

// MODELS
const Comment = require('../../models/comment.model');


const CommentsMutation = new GraphQLObjectType({
  name: 'CommentsMutation',
  fields: () => ({
    addNewComment: {
      type: GraphQLJSON,
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
          await newComment.save();    
          return {
            status: 'ok', 
            message: 'new comment has been saved...'
          }     
        }
        catch(e) {
            console.log(e)
        }
      }
    },
    updateComment: {
      type: GraphQLJSON,
      args: {
        commentId: {type: GraphQLID},
        newText: {type: GraphQLString}
      },
      async resolve(parent: any, args: any) {      
        try {
            await Comment.updateOne({_id: args.commentId}, {text: args.newText});
            return {
              status: 'ok',
              message: 'comment has been updated...'
            } 
        }
        catch(e) {
            console.log(e)
        }
      }
    },
    removeComment: {
      type: GraphQLJSON,
      args: {
        commentId: {type: GraphQLID}        
      },
      async resolve(parent: any, args: any) {      
        try {          
            await Comment.deleteOne({_id: args.commentId});  
            return {
              status: 'ok',
              message: 'comment has been removed...'
            }
        }
        catch(e) {
            console.log(e)
        }
      }
    },
  })
});

module.exports = CommentsMutation;