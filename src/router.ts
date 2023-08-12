import { Router } from 'express';

import { question, createReadme } from './controllers/questions';

const router = Router();

router.get('/questions', question);
router.post('/questions', createReadme);

export default router;