import { Router } from 'express';
import * as quizController from '../controllers/quizController.js';

const router = Router();

router.get('/', quizController.getAllQuizzes);
router.post('/', quizController.createQuiz);
router.get('/:id', quizController.getQuizById);
router.delete('/:id', quizController.deleteQuiz);

export default router;