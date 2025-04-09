import { NextFunction, Request, Response } from "express";

export const errorMiddleware = (err : any, req :Request , res : Response, next : NextFunction) => {

    const status = err.statusCode || 500;
    res.status(status).json({ ok : false, message : err.message});
}