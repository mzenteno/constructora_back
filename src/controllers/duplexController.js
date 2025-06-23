import { duplexService } from "../services/duplexService.js";

export const duplexController = {
  async create(req, res) {
    try {
      const data = req.body;
      const dataSaved = await duplexService.create(data);

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

      const dataSaved = await duplexService.update(id, data);

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
      const dataSaved = await duplexService.findAll();
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
      const dataSaved = await duplexService.findById(parseInt(req.params.id));

      if (!dataSaved) {
        return res.status(404).json({
          success: false,
          message: "Duplex Not found",
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

  async getNewCode(req, res) {
    try {
      const code = await duplexService.getNewCode();

      res.status(200).json({
        success: true,
        data: { code: code },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  async updateContractorsDeposit(req, res) {
    try {
      const id = parseInt(req.params.id);
      const data = req.body;

      const dataSaved = await duplexService.updateContractorsDeposit(id, data);

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
