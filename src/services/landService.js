import { landRepository } from '../repositories/landRepository.js';
import { appError } from '../config/appError.js';

export const landService = {

  async create(data) {
    if (!data.code || !data.ubication || !data.price == null) {
      throw new appError('All fields are required', 400);
    }

    return await landRepository.create(data);
  },

  async update(id, data) {
    if (!data.code || !data.ubication || !data.price == null) {
      throw new appError('All fields are required', 400);
    }

    await landService.findById(id);
    return await landRepository.update(id, data);
  },

  async delete(id) {
    await landService.findById(id);
    await landRepository.delete(id);
  },

  async findAll(filters = {}) {
    return await landRepository.findAll(filters);
  },

  async findById(id) {
    const data = await landRepository.findById(id);
    if (!data) {
      throw new appError('Land Not Found', 404);
    }
    return data;
  }

};