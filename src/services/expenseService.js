import { expenseRepository } from '../repositories/expenseRepository.js';
import { appError } from '../config/appError.js';

export const expenseService = {
  
  async create(data) {
    if (!data.description || data.amount == null) {
      throw new appError('All fields are required', 400);
    }

    return await expenseRepository.create(data);
  },

  async update(id, data) {
    if (!data.description || data.amount == null) {
      throw new appError('All fields are required', 400);
    }

    await expenseService.findById(id);
    return await expenseRepository.update(id, data);
  },

  async delete(id) {
    await expenseService.findById(id);
    await expenseRepository.delete(id);
  },

  async findAll(filters = {}) {
    const { description, startDate, endDate, expenseTypeId } = filters;

    if (startDate && !/^\d{4}-\d{2}-\d{2}$/.test(startDate)) {
      throw new Error('Invalid startDate format. Must be YYYY-MM-DD');
    }
    if (endDate && !/^\d{4}-\d{2}-\d{2}$/.test(endDate)) {
      throw new Error('Invalid endDate format. Must be YYYY-MM-DD');
    }

    return await expenseRepository.findAll({ description, startDate, endDate, expenseTypeId });
  },

  async findById(id) {
    const expenseType = await expenseRepository.findById(id);
    if (!expenseType) {
      throw new appError('Expense Not Found', 404);
    }
    return expenseType;
  }

};