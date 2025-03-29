

import { Router } from "express";
import { authController } from "../controllers/auth.controller.js";

const authRouter = Router();


authRouter.post("/login", authController.login )
authRouter.post("/register", authController.register)
authRouter.post("/logout", authController.logout )
authRouter.get("/verifyToken",authController.verify)
export default authRouter;