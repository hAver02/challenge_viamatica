import { Router } from "express"
import { personaController } from "../controllers/persona.controller.js";
const personaRouter = Router();


personaRouter.get("/", personaController.getAll)
personaRouter.put("/:id", personaController.updatePersona)
personaRouter.get("/:id", personaController.getById)
export default personaRouter