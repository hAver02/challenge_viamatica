import { Router} from 'express'
import { sessionController } from '../controllers/session.controller.js'
import verifyToken from '../middlewares/verify.token.js';
import verifyAdmin from '../middlewares/verify.admin.js';

const sessionRouter = Router()


sessionRouter.get("/", verifyToken, verifyAdmin, sessionController.getAll);
sessionRouter.get("/:userId",verifyToken, sessionController.getByUserId);

export default sessionRouter