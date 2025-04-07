import { Router } from "express"
import { personaController } from "../controllers/persona.controller";
import verifyAdmin from "../middlewares/verify.admin";
import verifyToken from "../middlewares/verify.token";
const personaRouter = Router();


personaRouter.get("/",verifyToken, verifyAdmin, personaController.getAll)
personaRouter.put("/:id", verifyToken ,personaController.updatePersona)
personaRouter.get("/:id",verifyToken, personaController.getById)
export default personaRouter