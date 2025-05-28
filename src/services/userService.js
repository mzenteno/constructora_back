import { userRepository } from '../repositories/userRepository.js';
import { appError } from '../config/appError.js';
import bcrypt from 'bcryptjs';

export const userService = {
  
  async create(data) {
    if (!data.userName || !data.fullName || !data.email) {
      throw new appError('All fields are required', 400);
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      throw new appError('Invalid email', 400);
    }

    const existingUser = await userRepository.findByEmail(data.email);
    if (existingUser) {
      throw new appError('The email is already registered', 400);
    }

    const hashedPassword = await bcrypt.hash('123456', 10);

    return await userRepository.create({
      ...data,
      password: hashedPassword,
      isActive: true
    });
  },

  async update(id, data) {
    if (!data.userName || !data.fullName || !data.email) {
      throw new appError('All fields are required', 400);
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      throw new appError('Invalid email', 400);
    }
    
    await userService.findById(id);

    return await userRepository.update(id, data);
  },

  async delete(id) {
    await userService.findById(id);
    await userRepository.delete(id);
  },

  async findAll() {
    return await userRepository.findAll();
  },

  async findById(id) {
    const user = await userRepository.findById(id);
    if (!user) {
      throw new appError('User Not Found', 404);
    }
    return user;
  },

  async validateUserNameAndPassword(userName, password) {
    const user = await userRepository.findByUserName(userName);

    if (!user) {
      throw new appError('Incorrect username or password', 500);
    }
    
    if (user.isActive == false) {
      throw new appError('Incorrect username or password', 500);
    }
    
    return user;
  }

};