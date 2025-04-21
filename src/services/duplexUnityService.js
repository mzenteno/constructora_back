import { duplexUnityRepository } from '../repositories/duplexUnityRepository.js';
import { appError } from '../config/appError.js';

export const duplexUnityService = {
  
  async create(data) {
    if (!data.code || !data.description) {
      throw new appError('All fields are required', 400);
    }

    return await duplexUnityRepository.create(data);
  },

  async update(id, data) {
    if (!data.code || !data.description) {
      throw new appError('All fields are required', 400);
    }

    await duplexUnityService.findById(id);

    return await duplexUnityRepository.update(id, data);
  },

  async delete(id) {
    await duplexUnityService.findById(id);
    await duplexUnityRepository.delete(id);
  },

  async findAll() {
    return await duplexUnityRepository.findAll();
  },

  async findById(id) {
    const dupĺexUnity = await duplexUnityRepository.findById(id);
    if (!dupĺexUnity) {
      throw new appError('Duplex Unity Not Found', 404);
    }
    return user;
  },

  async findByDuplexId(duplexId) {
    return await duplexUnityRepository.findByDuplexId(duplexId);
  },

};