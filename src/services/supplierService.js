import { supplierRepository } from '../repositories/supplierRepository.js';
import { appError } from '../config/appError.js';

export const supplierService = {
  
  async create(data) {
    if (!data.fullName || !data.email || !data.documentNumber == null) {
      throw new appError('All fields are required', 400);
    }

    return await supplierRepository.create(data);
  },

  async update(id, data) {
    if (!data.fullName || !data.email || !data.documentNumber == null) {
      throw new appError('All fields are required', 400);
    }

    await supplierService.findById(id);
    return await supplierRepository.update(id, data);
  },

  async delete(id) {
    await supplierService.findById(id);
    await supplierRepository.delete(id);
  },

  async findAll(filters = {}) {
    return await supplierRepository.findAll(filters);
  },

  async findById(id) {
    const data = await supplierRepository.findById(id);
    if (!data) {
      throw new appError('Supplier Not Found', 404);
    }
    return data;
  }

};