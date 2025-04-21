import { duplexRepository } from '../repositories/duplexRepository.js';
import { appError } from '../config/appError.js';

export const duplexService = {
  
  async create(data) {
    if (!data.code || !data.description) {
      throw new appError('All fields are required', 400);
    }

    return await duplexRepository.create(data);
  },

  async update(id, data) {
    console.log(data);
    if (!data.code || !data.description) {
      throw new appError('All fields are required', 400);
    }

    await duplexService.findById(id);

    return await duplexRepository.update(id, data);
  },

  async delete(id) {
    await duplexService.findById(id);
    await duplexRepository.delete(id);
  },

  async findAll() {
    return await duplexRepository.findAll();
  },

  async findById(id) {
    const dupĺex = await duplexRepository.findById(id);
    if (!dupĺex) {
      throw new appError('Duplex Not Found', 404);
    }
    return dupĺex;
  }

};