import { Router } from 'express';
import { upload } from '../middlewares/multer';
import { uploadCSV } from '../controllers/upload.controller';

const router = Router();


router.post('/upload-csv', upload.single('file'), uploadCSV);

export default router;