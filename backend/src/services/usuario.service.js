
import { usuarioDao } from "../dao/collections/usuario.dao.js";
import CustomError from "../utils/custom.error.js";




class UsuarioService {
    constructor(dao){
        this.dao = dao;
    }
    updateSessionStatus = async (id, bool) => {
        try {
            return await this.dao.updateSession(id, bool);
        } catch (error) {
            throw error
        }
    }

    findUserByUsernameOrEmail = async (username, email) => {
        try {
            const user = await this.dao.findUserByUsernameOrEmail(username,email)
            // console.log("userservice: user: ", user);
            return user
        } catch (error) {
            throw error
        }
    }

    updateFailedAttemps = async (id, number) => {
        try {
            if(number < 0 || number > 3) throw new CustomError("Error updating failed attemps", 400)
            return this.dao.updateFailed(id, number);
        } catch (error) {
            throw error
        }
    }

    updateStatus = async (id, newStatus) => {
        try {
            return await this.dao.updateStatus(id, newStatus)            
        } catch (error) {
            throw error
        }
    }

    getAll = async () => {
        try{
            return await this.dao.getAll();
        }catch(error){
            throw new Error(error);
        }
    }

    getById = async (id) => {
        try{
            const rta =  await this.dao.getById(id)
            if(!rta){ 
                throw new CustomError("Product not found", 404);
            }
            return rta;
        }catch(error){
            throw error;
            
        }
    }

    create = async (product) => {
        try{
            const rta = await this.dao.create(product);
            if(!rta) throw new CustomError("Error creating product", 404)
            return rta;
        }catch(error){
            throw error;
        }
    }

    update = async (id, product) => {
        try{
            const rta =  await this.dao.update(id,product)
            if(!rta){ 
                throw new CustomError("Product not found", 404);
            }
        }catch(error){
            console.log(error);
            
            throw error;
        }
    }

    delete = async (id) => {
        try{
            const rta =  await this.dao.delete(id)
            if(!rta){ 
                throw new CustomError("Product not found", 404);
            }
        }catch(error){
            throw error;
        }
    }
}

export const usuarioService = new UsuarioService(usuarioDao);