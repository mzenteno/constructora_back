import { prisma } from '../config/prisma.js';
import { getTx } from '../config/context.js';

function db() {
  return getTx() || prisma;
}

export const expenseTypeRepository = {
  
  async create(data) {
    return await db().expenseType.create({
      data: { description: data.description }
    });
  },

  async update(id, data) {
    return await db().expenseType.update({
      where: { id },
      data: { description: data.description }
    });
    
  },

  async delete(id) {
    return await db().expenseType.delete({
      where: { id }
    });
  },

  async findAll(filter = {}) {
    const { description } = filter;

    return await db().expenseType.findMany({
      where: {
        description: description ? {contains: description, mode: 'insensitive'} : undefined
      },
      select: {
        id: true,
        description: true    
      },
      orderBy: {
        description: 'asc'
      }
    });
  },

  async findById(id) {
    return await db().expenseType.findUnique({
      select: {
        id: true,
        description: true
      },
      where: { id }
    });
  }

}