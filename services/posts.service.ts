export {};
const Post = require('../models/post.model');
const User = require('../models/user.model');

class PostsService {
  
  getAllUserPostsById = async (id: string) => {
    try {
      const posts = await Post.find({owner: id});      
      return posts
    } catch(e) {      
      console.log(e)
    }
  }
  
  addNewPost = async (data: any) => {
    try {
      const { title, text, picture, owner } = data;
      const post = new Post({
        title,
        text, 
        picture, 
        owner
      });
      await post.save();
      return {message: 'post created'}
    } catch(e) {
      console.log(e)
    }    
  } 

  likePostById = async (postId: string, userId: string) => {
    try {   
      const post = await Post.findOne({_id: postId});  
      const isAlreadyLiked = post.likes.indexOf(userId);
      if(isAlreadyLiked === -1) {
        await Post.updateOne({_id: postId}, {likes: [...post.likes, userId]})
      } else {
        await Post.updateOne({_id: postId}, {likes: post.likes.filter((item: any) => item != userId)})
      }    
      return {message: 'Ok'}
    } catch(e) {
      console.log(e)
    }
  }

  getNews = async (_id: string) => {
    try {
      const user = await User.findOne({_id});
      const friendsPosts = await Post.find({owner: user.friends})
      return friendsPosts;
    } catch(e) {
      console.log(e)
    } 
  }
};

module.exports = PostsService;