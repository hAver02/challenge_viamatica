import { ModelUsuario } from "../../models/usuario.model.js";
import MongoDao from "../MongoDao.js";


class UsuarioDao extends MongoDao {
    constructor(model){
        super(model);
    }
    findUserByUsernameOrEmail(username, email){
        try {
            return this.model.findOne({$or : [{ username}, {email}] }).populate("idPersona")
        } catch (error) {
            throw new Error(error.getMessage())
        }
    }

    updateSession = async (id, bool) => {
        return await this.model.findByIdAndUpdate(id, { sessionActive : bool}, { new:true});
    };

    updateFailed = async (id, numb) => {
        return await this.model.findByIdAndUpdate(id, {failedAttemps : numb}, {new : true})
    }
    updateStatus = async (id, newStatus) => {
        return await this.model.findByIdAndUpdate(id, {status : newStatus }, {new : true});
    }
      
}

export const usuarioDao = new UsuarioDao(ModelUsuario);