import { Response, Request } from "express";

const PersonalChatsService = require('../services/personalChats.service');

class PersonalChatsController {
  private service: any;

  constructor() {
    this.service = new PersonalChatsService();
  }

  getChatsById = async (req: Request, res: Response) => {
    res.send(await this.service.getChatsById(req.params.id))
  }

}

module.exports = PersonalChatsController;