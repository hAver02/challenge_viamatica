import { sessionModel } from "../../models/sessions.model.js";
import MongoDao from "../MongoDao.js";

class SessionDao extends MongoDao{
    constructor(model){
        super(model);
    }
}


export const sessionDao = new SessionDao(sessionModel);