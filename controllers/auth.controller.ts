import { Response, Request } from "express";

export {};

const AuthService = require('../services/auth.service');


class AuthController {
private service
  constructor() {    
    this.service = new AuthService();
  }

  auth = async (req: Request, res: Response) => {
    res.send(await this.service.auth(req.body))
  }
  login = async (req: Request, res: Response) => {
    res.send(await this.service.login(req.body))
  }
};

module.exports = AuthController;

