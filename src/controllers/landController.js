import { landService } from '../services/landService.js';

export const landController = {

  async create(req, res) {
    try {
      const data = req.body;
      const dataSaved = await landService.create(data);
      
      res.status(201).json({
        success: true,
        data: dataSaved
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  },

  async update(req, res) {
    try {
      const id = parseInt(req.params.id);
      const data = req.body;

      const dataSaved = await landService.update(id, data);
      
      res.status(200).json({
        success: true,
        data: dataSaved
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  async findAll(req, res) {
    try {
      const { code, ubication, description, sold, supplierId } = req.query;
      
      const dataSaved = await landService.findAll({ code, ubication, description, sold, supplierId });
      res.status(200).json({
        success: true,
        data: dataSaved
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  async findById(req, res) {
    try {
      const dataSaved = await landService.findById(parseInt(req.params.id));
      
      if (!dataSaved) {
        return res.status(404).json({
          success: false,
          message: 'Land Not found'
        });
      }

      res.status(200).json({
        success: true,
        data: dataSaved
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

}
