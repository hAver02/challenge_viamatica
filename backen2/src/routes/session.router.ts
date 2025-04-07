import { Router} from 'express'
import { sessionController } from '../controllers/session.controller'
import verifyToken from '../middlewares/verify.token';
import verifyAdmin from '../middlewares/verify.admin';

const sessionRouter = Router()


sessionRouter.get("/", verifyToken, verifyAdmin, sessionController.getAll);
sessionRouter.get("/:userId",verifyToken, sessionController.getByUserId);

export default sessionRouter