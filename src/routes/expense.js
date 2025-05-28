import { Router } from 'express';
import { expenseController } from '../controllers/expenseController.js'

const router = Router();

router.post('/', expenseController.create);
router.put('/:id', expenseController.update);
router.delete('/:id', expenseController.findById);
router.get('/', expenseController.findAll);
router.get('/:id', expenseController.findById);

export default router;