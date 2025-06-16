import { Router } from 'express';
import { duplexController } from '../controllers/duplexController.js'

const router = Router();

router.post('/', duplexController.create);
router.put('/contractors-deposit/:id', duplexController.updateContractorsDeposit);
router.put('/:id', duplexController.update);
router.delete('/:id', duplexController.findById);
router.get('/', duplexController.findAll);
router.get('/new-code', duplexController.getNewCode);
router.get('/:id', duplexController.findById);

export default router;