import { Router } from 'express';

import { question, createReadme } from './controllers/questions';
import { usersCount } from './controllers/users';

const router = Router();

router.get('/questions', question);
router.post('/questions', createReadme);

router.get('/users', usersCount);

export default router;