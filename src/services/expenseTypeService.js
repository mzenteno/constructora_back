import { expenseTypeRepository } from '../repositories/expenseTypeRepository.js';
import { appError } from '../config/appError.js';

export const expenseTypeService = {
  
  async create(data) {
    if (!data.description) {
      throw new appError('All fields are required', 400);
    }

    return await expenseTypeRepository.create(data);
  },

  async update(id, data) {
    if (!data.description) {
      throw new appError('All fields are required', 400);
    }

    await expenseTypeService.findById(id);
    return await expenseTypeRepository.update(id, data);
  },

  async delete(id) {
    await expenseTypeService.findById(id);
    await expenseTypeRepository.delete(id);
  },

  async findAll(filter = {}) {
    return await expenseTypeRepository.findAll(filter);
  },

  async findById(id) {
    const expenseType = await expenseTypeRepository.findById(id);
    if (!expenseType) {
      throw new appError('Expense type Not Found', 404);
    }
    return expenseType;
  }

};