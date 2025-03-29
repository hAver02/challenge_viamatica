import { personaDao } from "../dao/collections/persona.dao.js";
import { usuarioDao } from "../dao/collections/usuario.dao.js";
import CustomError from "../utils/custom.error.js";
import bcrypt from "bcryptjs";

class AuthService {
    constructor(userDao, personaDao){
        this.userDao = userDao;
        this.personaDao = personaDao;
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
}

export const authService = new AuthService(usuarioDao, personaDao)