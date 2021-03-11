import GraphQLJSON from "graphql-type-json";

export {};
const graphql = require('graphql');
const {GraphQLObjectType,  GraphQLID, GraphQLString} = graphql;

// TYPES 

const PostType = require('../types/PostType');

// MODELS
const User = require('../../models/user.model');
const Post = require('../../models/post.model');


const PostsMutation = new GraphQLObjectType({
  name: 'PostsMutation',
  fields: () => ({
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
    removePost: {
      type: GraphQLJSON,
      args: {
        postId: {type: GraphQLID}
      },
      async resolve(parent: any, args: any) {
        try {
          await Post.deleteOne({_id: args.postId});  
          return {
            status: 'ok',
            message: 'post has been removed...'
          }  
        } catch(e) {
          console.log(e)
        }  
      }
    },
    updatePost: {
      type: GraphQLJSON,
      args: {
        postId: {type: GraphQLID},
        title: {type: GraphQLString},
        text: {type: GraphQLString},
        picture: {type: GraphQLString},
        video: {type: GraphQLString},
      },
      async resolve(parent: any, args: any) {
        try {
          await Post.updateOne({_id: args.postId}, {
            title: args.title,
            text: args.text,
            picture: args.picture,
            video: args.video
          });  
          return {
            status: 'ok',
            message: 'post has been update...'
          }  
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
  })
});

module.exports = PostsMutation;