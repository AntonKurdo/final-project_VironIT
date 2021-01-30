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

  likePostById = async (_id:string) => {
    try {
      const post = await Post.findOne({_id});  
      if(post.isFavourite) {
        await Post.updateOne({_id}, {isFavourite: !post.isFavourite, likes: post.likes - 1})
      } else {
        await Post.updateOne({_id}, {isFavourite: !post.isFavourite, likes: post.likes + 1})
      }    
      return {message: 'Ok'}
    } catch(e) {
      console.log(e)
    }
  }
};

module.exports = PostsService;