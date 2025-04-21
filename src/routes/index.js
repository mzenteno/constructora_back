import { Router } from 'express';
import { authMiddleware } from "../config/authMiddleware.js";
import user from "./user.js";
import duplex from "./duplex.js";
import duplexUnity from "./duplexUnity.js";
import { authController } from "../controllers/authController.js";

const router = Router();

router.post('/login', authController.login);

// Middleware para proteger rutas (todo lo que esté debajo de esto)
router.use(authMiddleware);

router.use('/user', user);
router.use('/duplex', duplex);
router.use('/duplex-unity', duplexUnity);

export default router;