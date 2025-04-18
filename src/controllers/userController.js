import { UserService } from '../services/userService.js';

export const UserController = {

  async create(req, res) {
    try {
      const data = req.body;
      const userSaved = await UserService.create(data);
      
      res.status(201).json({
        success: true,
        data: userSaved
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

      const userSaved = await UserService.update(id, data);
      
      res.status(200).json({
        success: true,
        data: userSaved
      });
    } catch (error) {
      const statusCode = error.message.includes('no encontrado') ? 404 : 400;
      res.status(statusCode).json({
        success: false,
        message: error.message
      });
    }
  },

  async findAll(req, res) {
    try {
      const users = await UserService.findAll();
      res.status(200).json({
        success: true,
        data: users
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
      const user = await UserService.findById(parseInt(req.params.id));
      
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User Not found'
        });
      }

      res.status(200).json({
        success: true,
        data: user
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

}