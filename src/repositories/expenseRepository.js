import { prisma } from '../config/prisma.js';
import { format } from 'date-fns';
import { getTx } from '../config/context.js';

function db() {
  return getTx() || prisma;
}

export const expenseRepository = {
  
  async create(data) {
    return await db().expense.create({
      data: { 
        description: data.description,
        amount: data.amount,
        createAt: data.createAt,
        expenseTypeId: data.expenseTypeId
       }
    });
  },

  async update(id, data) {
    return await db().expense.update({
      where: { id },
      data: { 
        description: data.description,
        amount: data.amount,
        createAt: data.createAt,
        expenseTypeId: data.expenseTypeId
       }
    });    
  },

  async delete(id) {
    return await db().expense.delete({
      where: { id }
    });
  },

  async findAll(filters = {}) {
    const { description, startDate, endDate, expenseTypeId } = filters;

    let whereCondition = {};
    
    if (startDate && endDate) {
      whereCondition.createAt = {
        ...(whereCondition.createAt || {}),
        gte: new Date(startDate),
        lte: new Date(endDate)
      };
    }
    if (description) {
      whereCondition.description = { 
        contains: description,
        mode: 'insensitive'
      };
    }
    if (expenseTypeId) {
      whereCondition.expenseTypeId = parseInt(expenseTypeId);
    }

    const expenses = await db().expense.findMany({
      where: whereCondition,
      select: {
        id: true,
        description: true,
        amount: true,
        createAt: true,
        expenseType: {
          select: { description: true }
        }
      },
      orderBy: {
        createAt: 'asc'
      }
    });

    return expenses.map(expense => ({
      ...expense,
      amount: parseFloat(expense.amount.toString()),
      createAt: format(new Date(expense.createAt), 'yyyy-MM-dd')
    }));
  },

  async findById(id) {
    const expense = await db().expense.findUnique({
      select: {
        id: true,
        description: true,
        amount: true,
        createAt: true,
        expenseType: {
          select: { 
            id: true,
            description: true 
          }
        }
      },
      where: { id }
    });

    return {
      ...expense,
      amount: parseFloat(expense.amount.toString()),
      createAt: format(new Date(expense.createAt), 'yyyy-MM-dd')
    };
  }
}
