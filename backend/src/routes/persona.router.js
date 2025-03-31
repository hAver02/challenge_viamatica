import { Router } from "express"
import { personaController } from "../controllers/persona.controller.js";
import verifyAdmin from "../middlewares/verify.admin.js";
import verifyToken from "../middlewares/verify.token.js";
const personaRouter = Router();


personaRouter.get("/",verifyToken, verifyAdmin, personaController.getAll)
personaRouter.put("/:id", verifyToken ,personaController.updatePersona)
personaRouter.get("/:id",verifyToken, personaController.getById)
export default personaRouter