import {Request, Response, NextFunction } from "express";
export {};
const jwt = require("jsonwebtoken");
const config = require('config');

module.exports = (req: Request, res: Response, next: NextFunction) => {
    try {    
      if(req.headers.authorization) {       
        const token = req
            .headers
            .authorization
            .split(' ')[1];           
        const decoded = jwt.verify(token, config.get('jwtSecret'));         
        next();
      } else {
        res
        .status(401)
        .json({message: 'You have no authorization...'})
      }     
    } catch (e) {
        res
            .status(401)
            .json({message: 'You have no authorization...'})
    }
}