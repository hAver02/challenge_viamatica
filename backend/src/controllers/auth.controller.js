
import jwt from "jsonwebtoken"
import { authService } from "../services/auth.service.js";
class AuthController{
    constructor(authService){
        this.authService = authService;
    }

    login = async (req, res, next) => {
        try {
       
            
            const { username, email, password} = req.body
            
            const {usuario, session} = await this.authService.login({username, email, password})
            
            const token = jwt.sign({userId : usuario._id, role : usuario.role, sessionId : session._id}, process.env.JWT_SECRET , {expiresIn : "1h"})

            res.cookie("authToken", token, {
                maxAge : 3600000
            })

            res.json({ ok : true, message: "logged succesfully!"})
        } catch (error) {
            
            next(error)
        }
    }

    logout = async (req, res, next) => {
        try {
            const token = req.cookies.authToken
            if(!token) return res.json({ ok : false, message : "You dont have active session!"});
            await this.authService.logout(token)
            res.clearCookie("authToken")
            res.json({ok : true, message : "Session closed succesfully!"})
        } catch (error) {
            next(error)
        }
    }

    register = async (req, res, next) => {
        
        try {
                    const { persona, usuario } = req.body;
                    // console.log({persona,usuario});
                    if(!persona || !usuario) return res.json({ ok : false, message : "Not info sent"})
                    
                    const newUser = await authService.register(persona, usuario );
                    res.status(200).json ( { ok : true, user : newUser})
        } catch (error) {
            next(error)
        }
    }
    verify = async (req, res, next) => {
        const {authToken} = req.cookies
        // console.log(authToken);
        
        if(!authToken) return res.status(401).json( { ok :false, message : "Unauthorized"});


        jwt.verify(authToken,process.env.JWT_SECRET, async (err,user)=> {
            if(err) return res.status(401).json({ ok : false, message : 'unauthorized'})

            if(!user.userId)return res.status(401).json({ ok : false, message : 'unauthorized'})
            try {
            
                const usuario =await this.authService.getUserById(user.userId)
       
                

                res.status(200).json({ok : true, usuario })
            } catch (error) {
                next(error)
            }
        })
    }
}


export const authController = new AuthController(authService)