import { expenseService } from "../services/expenseService.js";

export const expenseController = {
  async create(req, res) {
    try {
      const data = req.body;
      const dataSaved = await expenseService.create(data);

      res.status(201).json({
        success: true,
        data: dataSaved,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },

  async update(req, res) {
    try {
      const id = parseInt(req.params.id);
      const data = req.body;

      const dataSaved = await expenseService.update(id, data);

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

  async findAll(req, res) {
    try {
      const { description, startDate, endDate, expenseTypeId } = req.query;

      const dataSaved = await expenseService.findAll({ description, startDate, endDate, expenseTypeId });
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

  async findById(req, res) {
    try {
      const dataSaved = await expenseService.findById(parseInt(req.params.id));

      if (!dataSaved) {
        return res.status(404).json({
          success: false,
          message: "Expense Not found",
        });
      }

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
