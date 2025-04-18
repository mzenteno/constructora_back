import { UserRepository } from '../repositories/userRepository.js';
import { userCreateSchema, usuarioUpdateSchema, usuarioResponseSchema } from "../dto/user.dto.js";

export const UserService = {

  async create(data) {
    if (!data.userName || !data.fullName || !data.email) {
      throw new Error('Todos los campos son obligatorios');
    }

    return await UserRepository.create({
      ...data,
      password: '123456',
      isActive: true
    });
  },

  async update(id, data) {
    await UserService.findById(id);

    return await UserRepository.update(id, data);
  },

  async delete(id) {
    await UserService.findById(id);

    await UserRepository.delete(id);
  },

  async findAll() {
    return await UserRepository.findAll();
  },

  async findById(id) {
    const user = await UserRepository.findById(id);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
    return user;
  }

};