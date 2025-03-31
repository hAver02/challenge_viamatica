import { usuarioService } from "../services/usuario.service.js";
import CustomError from "../utils/custom.error.js";



class UsuarioController{
    constructor(service){
        this.service = service
    }

    getAll = async(req, res, next) => {
        try {
            const personas =await  this.service.getAll();
            return res.json({ ok : true, usuarios : personas})
        } catch (error) {
            next(error)
        }
    }
    getById = async (req, res,next) => {
        const {id} = req.params;
        console.log("id", id);
        
        try {
            const user = await this.service.getById(id);
            return res.json({ ok : true, user})
        } catch (error) {
            next(error)
        }
    }
    delete = async (req, res ,next ) => {
        const { id } = req.params;
        try {
            await this.service.delete(id);
            res.json({ ok : true, message : "User deleted succesfully!"})
        } catch (error) {
            next(error)
        }
    }

    updateUsername = async (req, res, next) => {
        const {username } = req.body
        const { id } = req.params

        if(!username) throw new CustomError("Not sent new username", 400)
        try {
            const userUpdated = await this.service.update(id, {username});

            
            return res.json({ ok : true, user : userUpdated})
        } catch (error) {
            next(error)
        }
    }
    update = async (req, res, next ) => { 
        try {
            const data = req.body;
            const { id }= req.params
            if(!data || !id) throw new CustomError("Not sent new data or id", 400)
            const userUpdated = await this.service.update(id, data);
            res.json({ok : true, user : userUpdated})

        } catch (error) {
            next(error)
        }
    }

    // crear mas metodos!

}

export const usuarioController = new UsuarioController(usuarioService);