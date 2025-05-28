import { Router } from 'express';
import { expenseTypeController } from '../controllers/expenseTypeController.js'

const router = Router();

router.post('/', expenseTypeController.create);
router.put('/:id', expenseTypeController.update);
router.delete('/:id', expenseTypeController.findById);
router.get('/', expenseTypeController.findAll);
router.get('/:id', expenseTypeController.findById);

export default router;