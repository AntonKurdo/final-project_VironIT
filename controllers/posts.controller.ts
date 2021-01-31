import { Response, Request } from "express";


const PostsService = require('../services/posts.service');

class PostsController {
  private service: any;

  constructor() {
    this.service = new PostsService();
  }

  getAllUserPostsById = async (req: Request, res: Response) => {    
    res.send(await this.service.getAllUserPostsById(req.params.id))
  }

  addNewPost = async (req: Request, res: Response) => {
    res.send(await this.service.addNewPost(req.body))
  }

  likePostById = async (req: Request, res: Response) => {
    res.send(await this.service.likePostById(req.body.postId, req.body.userId))
  }

  getNews = async (req: Request, res: Response) => {
    res.send(await this.service.getNews(req.params.id))
  }
}

module.exports = PostsController;


