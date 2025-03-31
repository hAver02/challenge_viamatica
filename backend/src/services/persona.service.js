import { personaDao } from "../dao/collections/persona.dao.js";
import CustomError from "../utils/custom.error.js";




class PersonaService {
    constructor(dao){
        this.dao = dao;
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
            const rta = await this.dao.getById(id)
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


    update = async (id, persona) => {
        try{
            const rta =  await this.dao.update(id,persona)
            console.log("rta", rta);
            if(!rta){ 
                throw new CustomError("Product not found", 404);
            }
            return rta
        }catch(error){
            
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

export const personaService = new PersonaService(personaDao);