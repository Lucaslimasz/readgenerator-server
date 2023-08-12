import { Router } from 'express';

import * as questions from './controllers/questions';

const router = Router();

router.get('/questions', questions.question);
router.post('/questions', questions.createReadme);

export default router;