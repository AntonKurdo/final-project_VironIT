import { Response, Request } from "express";
export {};
const CommentsService = require('../services/comments.service');

class CommentsController {
 service: any
  constructor() {    
    this.service = new CommentsService();
  }
  
  getCommentsByPostId = async (req: Request, res: Response) => {
    res.send(await this.service.getCommentsByPostId(req.params.id))
  }

  addComment = async (req: Request, res: Response) => {
    res.send(await this.service.addComment(req.body))
  }

};

module.exports = CommentsController;
