import { Response, Request } from "express";

const GroupChatService = require('../services/groupChats.service');

class GroupChatsController {
  private service: any;

  constructor() {
    this.service = new GroupChatService();
  }

  addGroupChat = async (req: Request, res: Response) => {
    res.send(await this.service.addGroupChat(req.body))
  }

  getGroupChatsById = async (req: Request, res: Response) => {
    res.send(await this.service.getGroupChatsById(req.params.id))
  }

  leftChat = async (req: Request, res: Response) => {
    res.send(await this.service.leftChat(req.body.chatId, req.body.userId, req.body.userLastName))
  }


}

module.exports = GroupChatsController;