import { failedService } from "../services/failed.service.js";

class IntentosController{
    constructor(service){
        this.service = service
    }

    create = async(req, res) => {
        const body = req.body
        try {
            const failed = await this.service.create(body);
            return res.json({ ok : true, intentoFallido : failed})
        } catch (error) {
            throw error
        }
    }
    findByUserId = async (req, res, next) => {
        const {userId} = req.params

        
        try {
            const intentosFallidos = await this.service.findByUserId(userId)
            return res.json({ ok : true, intentosFallidos : intentosFallidos})
        } catch (error) {
            next(error)
        }
    }
}

export const intentosController = new IntentosController(failedService);