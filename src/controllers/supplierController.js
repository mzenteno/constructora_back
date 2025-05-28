import { supplierService } from '../services/supplierService.js';

export const supplierController = {
 
  async create(req, res) {
    try {
      const data = req.body;
      const dataSaved = await supplierService.create(data);
      
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

      const dataSaved = await supplierService.update(id, data);
      
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
      const { fullName, phone, email, documentNumber, address } = req.query;
      
      const dataSaved = await supplierService.findAll({ fullName, phone, email, documentNumber, address });
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
      const dataSaved = await supplierService.findById(parseInt(req.params.id));
      
      if (!dataSaved) {
        return res.status(404).json({
          success: false,
          message: 'Supplier Not found'
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