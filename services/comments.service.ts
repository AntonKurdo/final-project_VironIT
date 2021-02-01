export {};
const Comment = require('../models/comment.model');

interface iComment {
  _id?: string,
  postId: string,
  userId: string,
  userName: string,
  userAva: string,
  date?: Date,
  text: string
};


class CommentsService {

  getCommentsByPostId = async (postId: string) => {
    try {
      const comments = await Comment.find({postId});
      return comments;
    } catch(e) {
      console.log(e)
    }
  };

  addComment = async (comment: iComment) => {  
    try {
      const newComment = new Comment(comment);      
      await newComment.save();
      return {
        message: 'Comment was added...'
      }
    }
    catch(e) {
        console.log(e)
    }
  }; 
}
module.exports = CommentsService;