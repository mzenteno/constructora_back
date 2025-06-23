import { Router } from "express";
import { duplexUnityBudgetItemDetailController } from "../controllers/duplexUnityBudgetItemDetailController.js";

const router = Router();

router.get("/duplex/:duplexId/budget-item/:budgetItemId", duplexUnityBudgetItemDetailController.findByDuplexIdBudgetItemId);

export default router;
