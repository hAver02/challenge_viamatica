import { usuarioService } from "../services/usuario.service.js";



class UsuarioController{
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
    // crear mas metodos!

}

export const usuarioController = new UsuarioController(usuarioService);