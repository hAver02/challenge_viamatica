import { NextFunction, Request, Response } from "express";

const verifyAdmin = (req :Request, res: Response, next : NextFunction) => {
    const data = req.user;

    
    if(!data || data.role != "admin" ) return res.json({ ok : false, message :"unauthorized"})

    next();
    
}

export default verifyAdmin