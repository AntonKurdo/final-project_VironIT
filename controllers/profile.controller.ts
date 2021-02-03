import { Response, Request } from "express";

const ProfileService = require('../services/profile.service');

class ProfileController {
  private service: any;

  constructor() {
    this.service = new ProfileService();
  }

  changeAvatar = async (req: Request, res: Response) => {
    res.send(await this.service.changeAvatar(req.body.userId, req.body.newAvatar))
  }


}

module.exports = ProfileController;
