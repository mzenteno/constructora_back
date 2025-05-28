import { Router } from 'express';
import { landController } from '../controllers/landController.js'

const router = Router();

router.post('/', landController.create);
router.put('/:id', landController.update);
router.delete('/:id', landController.findById);
router.get('/', landController.findAll);
router.get('/:id', landController.findById);

export default router;