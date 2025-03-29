import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { usuarioService } from "../services/usuario.service.js";
import { authService } from "../services/auth.service.js";
class AuthController{
    constructor(ususarioService, authService){
        this.usuarioService = ususarioService;
        this.authService = authService;
    }
    login = async (req, res, next) => {
            // pasar la funcion al service.
        try {
            const { username, email, password } = req.body
            let usuario = await this.usuarioService.findUserByUsernameOrEmail(username,email)
            if(!usuario) return res.status(404).json({ok : false, message : "user not found!"});

            if(usuario.status == "blocked") return res.status(403).json({ ok : false, message : " Blocked user"});
            if(usuario.sessionActive) return res.status(400).json({ ok : false, message : "already have one active session"})
            
            const isValidPassword = await bcrypt.compare(password, usuario.password) 

            if(!isValidPassword) {
                usuario = await usuarioService.updateFailedAttemps(usuario._id, usuario.failedAttemps);
                return res.status(401).json({ ok : false, messge : "Invalid password" });

            }

            if(usuario.failedAttemps >=3) {
                await usuarioService.updateStatus(usuario._id, 'blocked');
                return res.status(403).json({ ok : false, message : "Your account has been blocked" })
            }


            await this.usuarioService.updateSessionStatus(usuario._id, true);

            // necesario?
            const token = jwt.sign({userId : usuario._id, role : usuario.role}, "s3cr3tA$", {expiresIn : "24h"})
            //vamos a poner cookies?

            res.json({ ok : true, token})
        } catch (error) {
            next(error)
        }
    }

    logout = (req, res) => {
        // const token = 
        // await this.usuarioService.updateSessionStatus()
    }

    register = async (req, res, next) => {
        
        try {
                    const { persona, usuario } = req.body;
                    const newUser = await authService.register(persona, usuario );
                    res.status(200).json ( { ok : true, user : newUser})
        } catch (error) {
            next(error)
        }
    }
}


export const authController = new AuthController(usuarioService, authService)