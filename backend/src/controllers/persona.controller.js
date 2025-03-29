import { personaService } from "../services/persona.service.js";


class PersonaController{
    constructor(service){
        this.service = service
    }

    getAll = async(req, res) => {
        try {
            
            const personas = this.service.getAll();
            return res.json({ ok : true, personas})
        } catch (error) {
            throw error
        }
    }

}

export const personaController = new PersonaController(personaService);