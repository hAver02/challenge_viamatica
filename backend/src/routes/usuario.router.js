import { Router } from "express"
import { usuarioController } from "../controllers/usuario.controller.js";

const usuarioRouter = Router();


usuarioRouter.get("/", usuarioController.getAll)
usuarioRouter.get("/:id", usuarioController.getById)
usuarioRouter.put("/:id/username", usuarioController.updateUsername)
usuarioRouter.put("/:id", usuarioController.update)

export default usuarioRouter