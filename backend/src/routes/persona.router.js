import { Router } from "express"
import { personaController } from "../controllers/persona.controller.js";
const personaRouter = Router();


personaRouter.get("/", personaController.getAll)

export default personaRouter