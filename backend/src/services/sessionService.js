import { sessionDao } from "../dao/collections/session.dao.js";

class SessionService{
    constructor(sessionDao){
        this.sessionDao = sessionDao;
    }

    getAll = async () => {
        try {
            return this.sessionDao.getAll();
        } catch (error) {
            throw new Error(error.message)
        }
    }

    create = async (session) => {
        try {
            //validaciones
            return this.sessionDao(session)
        } catch (error) {
            throw new Error(error.message)
        }
    }
    
} 


export const sessionService = new SessionService(sessionDao)