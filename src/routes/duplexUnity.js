import { Router } from 'express';
import { duplexUnityController } from '../controllers/duplexUnityController.js'

const router = Router();

router.post('/', duplexUnityController.create);
router.put('/:id', duplexUnityController.update);
router.delete('/:id', duplexUnityController.findById);
router.get('/', duplexUnityController.findAll);
router.get('/:id', duplexUnityController.findById);

export default router;