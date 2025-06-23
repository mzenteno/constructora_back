import { Router } from "express";
import { authMiddleware } from "../config/authMiddleware.js";
import { authController } from "../controllers/authController.js";
import user from "./user.js";
import duplex from "./duplex.js";
import duplexUnityBudgetItem from "./duplexUnityBudgetItem.js";
import duplexUnityBudgetItemDetail from "./duplexUnityBudgetItemDetail.js";
import duplexUnity from "./duplexUnity.js";
import expenseType from "./expenseType.js";
import expense from "./expense.js";
import supplier from "./supplier.js";
import land from "./land.js";

const router = Router();

router.post("/login", authController.login);

// Middleware para proteger rutas (todo lo que esté debajo de esto)
router.use(authMiddleware);

router.use("/user", user);
router.use("/duplex", duplex);
router.use("/duplex-unity", duplexUnity);
router.use("/duplex-unity-budget-item", duplexUnityBudgetItem);
router.use("/duplex-unity-budget-item-detail", duplexUnityBudgetItemDetail);
router.use("/expense", expense);
router.use("/expense-type", expenseType);
router.use("/supplier", supplier);
router.use("/land", land);

export default router;
