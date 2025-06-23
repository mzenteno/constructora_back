import { duplexUnityService } from "../services/duplexUnityService.js";

export const duplexUnityController = {
  async create(req, res) {
    try {
      const data = req.body;
      const dataSaved = await duplexUnityService.create(data);

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

      const dataSaved = await duplexUnityService.update(id, data);

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
      const dataSaved = await duplexUnityService.findAll();
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
      const dataSaved = await duplexUnityService.findById(parseInt(req.params.id));

      if (!dataSaved) {
        return res.status(404).json({
          success: false,
          message: "Duplex Unity Not found",
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

  async findByDuplexId(req, res) {
    try {
      const dataSaved = await duplexUnityService.findByDuplexId(req.params.id);

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
