

import { Router } from "express";
import { intentosController } from "../controllers/intentos.fallidos.controller.js";
import verifyToken from "../middlewares/verify.token.js";
import verifyAdmin from "../middlewares/verify.admin.js";


const intentosRouter = Router();


intentosRouter.post("/", verifyToken,intentosController.create);
intentosRouter.get("/:userId", verifyToken, intentosController.findByUserId)
export default intentosRouter;