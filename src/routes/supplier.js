import { Router } from 'express';
import { supplierController } from '../controllers/supplierController.js'

const router = Router();

router.post('/', supplierController.create);
router.put('/:id', supplierController.update);
router.delete('/:id', supplierController.findById);
router.get('/', supplierController.findAll);
router.get('/:id', supplierController.findById);

export default router;