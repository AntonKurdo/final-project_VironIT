export {};
const graphql = require('graphql');
const { GraphQLObjectType,  GraphQLID, GraphQLList } = graphql;

// TYPES 

const PostType = require('../types/PostType');
const NewsType = require('../types/NewsType');

// MODELS
const User = require('../../models/user.model');
const Post = require('../../models/post.model');


const PostsQuery = new GraphQLObjectType({
  name: 'PostsQuery',
  fields: () => ({
    post: {
      type: PostType,
      args: {postId: {type: GraphQLID}},
      resolve(parent: any, args: any) {
        return Post.findById(args.postId)
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
      type: GraphQLList(NewsType),
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
  })
});


module.exports = PostsQuery;