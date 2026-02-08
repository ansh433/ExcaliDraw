import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import {JWT_SECRET} from  '@repo/backend-common/config'
import { string } from "zod/v4";

export function middleware (req: Request, res: Response, next: NextFunction){
    const token = req.headers["authorization"] ?? "";

    const decoded = jwt.verify(token, JWT_SECRET);

    

    if(typeof decoded != 'string' && decoded.userId){
        req.userId = decoded.userId;
        next();
    } 
    else {
        res.status(403).json({
            message: "Unauthorized"
        })
    }
}