import { Router } from "express"
import { usuarioController } from "../controllers/usuario.controller.js";

const usuarioRouter = Router();


usuarioRouter.get("/", usuarioController.getAll)
usuarioRouter.get("/:id", usuarioController.getById)

export default usuarioRouter