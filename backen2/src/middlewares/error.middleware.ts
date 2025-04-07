import { NextFunction, Request, Response } from "express";

export const errorMiddleware = (err : any, req :Request , res : Response, next : NextFunction) => {
    console.log("err!", {err : err.message});
    
    const status = err.statusCode || 500;
    res.status(status).json({ ok : false, message : err.message});
}