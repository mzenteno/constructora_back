import { prisma } from '../config/prisma.js';
import { getTx } from '../config/context.js';

function db() {
  return getTx() || prisma;
}

export const budgetItemRepository = {
  
  async create(data) {
    return await db().budgetItem.create({
      data: {
       }
    });
  },

  async update(id, data) {
    return await db().budgetItem.update({
      where: { id },
      data: {
       }
    });    
  },

  async delete(id) {
    return await db().budgetItem.delete({
      where: { id }
    });
  },

  async findAll() {
    return await db().budgetItem.findMany();
  },

  async findById(id) {
    return await db().budgetItem.findUnique({
      select: {
      },
      where: { id }
    });
  }

}