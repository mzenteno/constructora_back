import { Router } from 'express';
import { duplexUnityBudgetItemController } from '../controllers/duplexUnityBudgetItemController.js'

const router = Router();

router.post('/', duplexUnityBudgetItemController.create);
router.put('/:id', duplexUnityBudgetItemController.update);
router.delete('/:id', duplexUnityBudgetItemController.findById);
router.get('/', duplexUnityBudgetItemController.findAll);
router.get('/:id', duplexUnityBudgetItemController.findById);
router.put('/by-duplex/:id', duplexUnityBudgetItemController.updateByDuplex);
router.get('/by-duplex/:id', duplexUnityBudgetItemController.findByDuplex);

export default router;