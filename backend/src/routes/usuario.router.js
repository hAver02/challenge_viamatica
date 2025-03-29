import { Router } from "express"
import { usuarioController } from "../controllers/usuario.controller.js";

const usuarioRouter = Router();


usuarioRouter.get("/", usuarioController.getAll)

export default usuarioRouter