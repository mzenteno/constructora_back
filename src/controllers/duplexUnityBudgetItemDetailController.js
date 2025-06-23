import { duplexUnityBudgetItemDetailService } from "../services/duplexUnityBudgetItemDetailService.js";

export const duplexUnityBudgetItemDetailController = {
  async findByDuplexIdBudgetItemId(req, res) {
    try {
      const duplexId = parseInt(req.params.duplexId);
      const budgetItemId = parseInt(req.params.budgetItemId);

      const dataSaved = await duplexUnityBudgetItemDetailService.findByDuplexIdBudgetItemId(duplexId, budgetItemId);
      console.log(dataSaved);
      res.status(200).json({
        success: true,
        data: dataSaved,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
};
