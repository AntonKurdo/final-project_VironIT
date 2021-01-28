import { Response, Request } from "express";


const PostsService = require('../services/posts.service');

class PostsController {
  service: any;

  constructor() {
    this.service = new PostsService();
  }

  getAllUserPostsById = async (req: Request, res: Response) => {    
    res.send(await this.service.getAllUserPostsById(req.params.id))
  }

  addNewPost = async (req: Request, res: Response) => {
    res.send(await this.service.addNewPost(req.body))
  }

}

module.exports = PostsController;


