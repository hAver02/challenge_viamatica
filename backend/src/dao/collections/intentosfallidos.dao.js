import { FailedModel } from "../../models/intentosFallidos.model.js";
import MongoDao from "../MongoDao.js";

class IntentosFallidos extends MongoDao {
    constructor(model){
        super(model);
    }

    findByUserId = async (id) => {
        return this.model.find({userId : id})
    }
}

export const intentosFallidosDao = new IntentosFallidos(FailedModel)