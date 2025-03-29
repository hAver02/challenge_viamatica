import { PersonaModel } from "../../models/persona.model.js";
import MongoDao from "../MongoDao.js";


class PersonaDao extends MongoDao {
    constructor(model){
        super(model);
    }

    findByDocument = async (document) => {
        return this.model.findOne({documento : document})
    }
}

export const personaDao = new PersonaDao(PersonaModel)