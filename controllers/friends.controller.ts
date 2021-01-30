import { Response, Request } from "express";

const FriendsService = require('../services/friends.service');

class FriendsController {
  private service: any;

  constructor() {
    this.service = new FriendsService();
  }

  getAllUsers = async (req: Request, res: Response) => {    
    res.send(await this.service.getAllUsers())
  }

  getAllFriendsByUserId = async (req: Request, res: Response) => {    
    res.send(await this.service.getAllFriendsByUserId(req.params.id))
  }

  addFriend = async (req: Request, res: Response) => {    
    res.send(await this.service.addFriend(req.body))
  }

}

module.exports = FriendsController;

