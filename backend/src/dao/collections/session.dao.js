import { sessionModel } from "../../models/sessions.model.js";
import MongoDao from "../MongoDao.js";

class SessionDao extends MongoDao{
    constructor(model){
        super(model);
    }

    setSessionEnd = async (sessionId) => {
        // console.log("Aca!");
        
        return await this.model.findByIdAndUpdate(sessionId, {sessionEnd : new Date()}, { new : true});
    }

    getSessionByUserIdAndWithEndNull = async (userId) => {
        return await this.model.find({$and : [{userId : userId}, {sessionEnd : null}]})
    }
    getByUserId = async(userId) => {
        return this.model.find({userId});
    }
}


export const sessionDao = new SessionDao(sessionModel);