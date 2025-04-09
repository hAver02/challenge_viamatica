import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken'
import { UserPayload } from 'types/UserPayload';

const verifyToken = (req: Request, res : Response, next: NextFunction) => {
    const token = req.cookies.authToken;
    if (!token){
        res.status(401).json({ message: "You are not authenticated" });
    }else{

    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "")  as UserPayload 
        (req as any).user = decoded
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid token" })
    }
}   
};



export default verifyToken;