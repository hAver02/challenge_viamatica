import { Router} from 'express'
import { sessionController } from '../controllers/session.controller.js'

const sessionRouter = Router()


sessionRouter.get("/", sessionController.getAll);
sessionRouter.get("/:userId}", sessionController.getByUserId);

export default sessionRouter