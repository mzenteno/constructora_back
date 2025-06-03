import { userService } from '../services/userService.js';

export const userController = {

  async create(req, res) {
    try {
      const data = req.body;
      const userSaved = await userService.create(data);
      const { password, ...userWithOutPassword } = userSaved;
      
      res.status(201).json({
        success: true,
        data: userWithOutPassword
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

      const userSaved = await userService.update(id, data);
      const { password, ...userWithOutPassword } = userSaved;
      
      res.status(200).json({
        success: true,
        data: userWithOutPassword
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
      const users = await userService.findAll();
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
      const user = await userService.findById(parseInt(req.params.id));
      
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
  },

  async changePassword(req, res) {
    try {
      const id = parseInt(req.params.id);
      const data = req.body;

      const userSaved = await userService.updatePassword(id, data);
      const { password, ...userWithOutPassword } = userSaved;
      
      res.status(200).json({
        success: true,
        data: userWithOutPassword
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

}