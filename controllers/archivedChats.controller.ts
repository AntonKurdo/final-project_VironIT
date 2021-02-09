import { Response, Request } from "express";

const ArchivedChatsService = require('../services/archivedChats.service');

class ArchivedChatsController {
  private service: any;

  constructor() {
    this.service = new ArchivedChatsService();
  }

  getArchivedChatsById = async (req: Request, res: Response) => {
    res.send(await this.service.getArchivedChatsById(req.params.id))
  }

  archiveChat = async (req: Request, res: Response) => {
    res.send(await this.service.archiveChat(req.body.userId, req.body.chatId))
  }

  unarchiveChat = async (req: Request, res: Response) => {
    res.send(await this.service.unarchiveChat(req.body.userId, req.body.chatId))
  }


}

module.exports = ArchivedChatsController;