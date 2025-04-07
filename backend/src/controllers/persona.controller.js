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
    updatePersona = async (req, res, next) => {
        const persona = req.body
        const {id} = req.params
    
        
        try {
            const newPersona = await this.service.update(id, persona)

            return res.json({ ok : true, persona : newPersona})
        } catch (error) {
            next(error)
        }
    }


    getById = async (req, res, next) => {
        const { id } = req.params
        try {
            const persona = await this.service.getById(id);

            
            res.json({ ok : true, persona})
        } catch (error) {
            next(error)
        }
    }

}

export const personaController = new PersonaController(personaService);