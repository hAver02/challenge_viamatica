import { sessionService } from "../services/sessionService.js";


class SessionController {
    constructor(service){
        this.service = service;
    }
    getAll = async(req, res) => {
        try {
            const sessiones = await this.service.getAll();
            return res.json({ ok : true, sessiones})
        } catch (error) {
            console.log(error);
            
            // throw error
        }
    }

    getByUserId = async (req, res, next) => {
        const {userId} = req.params;

        try {
            const sessions = await this.service.getByUserId(userId);
                    
            return res.json({ ok : true , sessions })
        } catch (error) {
            next(error)
        }
        
    }
}


export const sessionController = new SessionController(sessionService);