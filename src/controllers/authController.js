import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { userService } from '../services/userService.js';

export const authController = {

  async login(req, res) {
    const { userName, password } = req.body;

    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

    const user = await userService.validateUserNameAndPassword(userName, password);
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ success: false, message: 'Incorrect username or password' });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.userName },
      JWT_SECRET_KEY,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      success: true,
      token,
      data: {
        id: user.id,
        email: user.email,
        userName: user.userName
      }
    });
  }
  
};
