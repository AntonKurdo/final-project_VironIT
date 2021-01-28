export {};
const Post = require('../models/post.model');
const User = require('../models/user.model');

class PostsService {
  
  getAllUserPostsById = async (id: string) => {
    try {
      const posts = await Post.find({owner: id});
      console.log(posts)
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
};

module.exports = PostsService;