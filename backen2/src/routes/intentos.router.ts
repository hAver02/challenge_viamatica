

import { Router } from "express";
import { intentosController } from "../controllers/intentos.fallidos.controller";
import verifyToken from "../middlewares/verify.token";



const intentosRouter = Router();


intentosRouter.post("/", verifyToken,intentosController.create);
intentosRouter.get("/:userId", verifyToken, intentosController.findByUserId)
export default intentosRouter;