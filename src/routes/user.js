import { Router } from 'express';
import { userController } from '../controllers/userController.js'

const router = Router();

router.post('/', userController.create);
router.put('/:id', userController.update);
router.put('/:id', userController.findById);
router.get('/', userController.findAll);
router.get('/:id', userController.findById);
router.put('/change-password/:id', userController.changePassword);

export default router;