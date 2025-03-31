import { intentosFallidosDao } from "../dao/collections/intentosfallidos.dao.js";

class FailedService {
    constructor(dao){
        this.dao = dao;
    }

    create = async () => {
        try{
            return await this.dao.create();
        }catch(error){
            throw new Error(error);
        }
    }


    findByUserId = async (id) => {
        try{
            const rta = await this.dao.findByUserId(id)
            if(!rta){ 
                throw new CustomError("Failes not found", 404);
            }
            return rta;
        }catch(error){
            throw error;
            
        }
    }

}

export const failedService = new FailedService(intentosFallidosDao);