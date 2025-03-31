import { intentosFallidosDao } from "../dao/collections/intentosfallidos.dao.js";
import { personaDao } from "../dao/collections/persona.dao.js";
import { sessionDao } from "../dao/collections/session.dao.js";
import { usuarioDao } from "../dao/collections/usuario.dao.js";
import CustomError from "../utils/custom.error.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

class AuthService {
    constructor(userDao, personaDao, sessionDao, failedDao){
        this.userDao = userDao;
        this.personaDao = personaDao;
        this.sessionDao = sessionDao;
        this.failedDao = failedDao
    }

    register = async (personaData, usuarioData) => {
        //crear funcion!
            const {nombre, apellido, documento, fechaNacimiento} = personaData;
            if(!nombre ||  !apellido || !documento || !fechaNacimiento) throw new CustomError("wrong person information sent",404);
           
            const {password, email, username, role }=  usuarioData
            if(!password || !email || !username) throw new CustomError("wrong user information sent",404);
    
            let persona = await this.personaDao.findByDocument( documento);
            // console.log("persona auth service", persona);
            
            if (persona) throw new CustomError(400, "Already exist one accoun with this document!")
    
            
            const user = await this.userDao.findUserByUsernameOrEmail(usuarioData.username, usuarioData.email);
            if(user)throw new CustomError("Already exist one accoun with this email or username!",400)
    
            const newPersona = await this.personaDao.create(personaData);
            // console.log("auth service, new persona", newPersona);
            
            const hashedPassword = await bcrypt.hash(usuarioData.password, 10);
          
            // Crear usuario con referencia a la persona
            const usuario = await this.userDao.create({
              idPersona: newPersona._id,
              username: usuarioData.username,
              email: usuarioData.email,
              password: hashedPassword,
              role: usuarioData.role || "user",
            });
          
            return usuario;

    }
    login = async ({username, email, password }) => {
        try {
                let usuario = await this.userDao.findUserByUsernameOrEmail(username,email)
                
                if(!usuario) throw new CustomError("User not found", 404)
            
                if(usuario.status == "blocked") throw new CustomError("Blocked user", 403);

                // sessiones que sean de este usuario y que en el end este en null
                const currentTime = new Date();
                const cookieExpirationTime = 3600000
                const sessiones = await this.sessionDao.getSessionByUserIdAndWithEndNull(usuario._id);

                for(let session of sessiones){
                    const sessionDuration = currentTime - session.sessionStart;
                    if(sessionDuration > cookieExpirationTime){
                        await this.sessionDao.setSessionEnd(session._id);
                        usuario = await this.userDao.updateSession(usuario._id, false)
                    }
                }

                if(usuario.sessionActive) throw new CustomError("Already have one active session", 400)
                        
                 const isValidPassword = await bcrypt.compare(password, usuario.password) 
                console.log("isValid" , isValidPassword);
                
                if(!isValidPassword) {
                    await this.failedDao.create({userId : usuario._id, date : new Date()})
                    usuario = await this.userDao.updateFailedAttemps(usuario._id, usuario.failedAttemps);
                    throw new CustomError("Invalid password" , 401)
                }
            
                if(usuario.failedAttemps >=3) {
                    await this.userDao.updateStatus(usuario._id, 'blocked');
                    throw new CustomError("Your account has been blocked" , 403)
                }
            
            
                await this.userDao.updateSession(usuario._id, true);
                
                const session = await this.sessionDao.create({userId : usuario._id});
        
                return {usuario, session};
                } catch (error) {
                    throw error;
                }
    }
    logout = async (token) => {
        try {
            // console.log(token, process.env.JWT_SECRET);
            
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // console.log("decoded", decoded);
            await this.userDao.updateSession(decoded.userId, false);
            
            await this.sessionDao.setSessionEnd(decoded.sessionId);

        } catch (error) {
            // console.log(error);
            
            throw error;
        }
    }
    getUserById = async (id) => {
        try {
            const user = await this.userDao.getById(id)
            delete user.password
            const persona = await this.personaDao.getById(user.idPersona)    
            const usuario = {user, persona}
            
            if(!user || !persona) throw new CustomError("User not found", 404)
                return usuario;
            
        } catch (error) {
            throw error
        }
    }
    
}

export const authService = new AuthService(usuarioDao, personaDao, sessionDao, intentosFallidosDao)