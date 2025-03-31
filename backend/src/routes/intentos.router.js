

import { Router } from "express";
import { intentosController } from "../controllers/intentos.fallidos.controller.js";


const intentosRouter = Router();


intentosRouter.post("/", intentosController.create);
intentosRouter.get("/:userId", intentosController.findByUserId)
export default intentosRouter;