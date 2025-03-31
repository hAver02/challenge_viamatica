import { Router } from "express"
import { usuarioController } from "../controllers/usuario.controller.js";
import verifyToken from "../middlewares/verify.token.js";
import verifyAdmin from "../middlewares/verify.admin.js";

const usuarioRouter = Router();


usuarioRouter.get("/", verifyToken,verifyAdmin ,usuarioController.getAll)
usuarioRouter.get("/:id", verifyToken ,usuarioController.getById)
usuarioRouter.put("/:id/username", verifyToken,usuarioController.updateUsername)
usuarioRouter.put("/:id", verifyToken, usuarioController.update)

export default usuarioRouter