import { Router } from 'express';
import { UserController } from '../controllers/userController.js'

const router = Router();

router.post('/', UserController.create);
router.put('/:id', UserController.update);
router.get('/', UserController.findAll);
router.get('/:id', UserController.findById);

export default router;