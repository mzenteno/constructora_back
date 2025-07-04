import { prisma } from '../config/prisma.js';
import { setTx } from '../config/context.js';
import { duplexUnityBudgetItemRepository } from '../repositories/duplexUnityBudgetItemRepository.js';
import { duplexUnityBudgetItemDetailService } from '../services/duplexUnityBudgetItemDetailService.js';
import { duplexService } from '../services/duplexService.js';
import { duplexUnityRepository } from '../repositories/duplexUnityRepository.js';
import { appError } from '../config/appError.js';

export const duplexUnityBudgetItemService = {
  
  async create(data) {
    return await duplexUnityBudgetItemRepository.create(data);
  },

  async update(id, data) {
    return await duplexUnityBudgetItemRepository.update(id, data);
  },

  async delete(id) {
  },

  async findAll(filters = {}) {
    const { description, startDate, endDate, expenseTypeId } = filters;
    return await duplexUnityBudgetItemRepository.findAll({ description, startDate, endDate, expenseTypeId });
  },

  async findById(id) {
    const expenseType = await duplexUnityBudgetItemRepository.findById(id);
    if (!expenseType) {
      throw new appError('Expense Not Found', 404);
    }
    return expenseType;
  },

  async updateByDuplex(duplexId, data) {
    const duplexUnityList = await duplexUnityRepository.findByDuplexId(duplexId);

    return await prisma.$transaction(async (tx) => {
      setTx(tx);

      for (const unity of duplexUnityList) {
        const item = await duplexUnityBudgetItemRepository.findByDuplexUnityAndBudgetItem(unity.id, data.budgetItemId);
        if (item) {
          const budgete = Number(item.amountBudgete) + (Number(data.amountBudgete) / 2);
          const spent = Number(item.amountSpent) + (Number(data.amountSpent) / 2);
          const amountReal = budgete - spent;

          await duplexUnityBudgetItemRepository.update(item.id, {
            amountBudgete: budgete,
            amountSpent: spent,
            amountReal: amountReal
          });

          if(data.type == 'Spent') {
            await duplexUnityBudgetItemDetailService.create({
              duplexUnityBudgetItemId: item.id,
              createAt: new Date(),
              total: (Number(data.amountSpent) / 2),
              description: data.description
            });
          }
        }
      }

      if(data.type == 'Spent') {
        await duplexService.updateSubTotalSpent(duplexId, { subTotalSpent: data.amountSpent});
       
      }
    });

    
  },

  async findByDuplex(duplexId) {
    const duplexUnityList = await duplexUnityRepository.findByDuplexId(duplexId);
    return await duplexUnityBudgetItemRepository.findSumByBudgetItemForDuplexUnity([duplexUnityList[0].id, duplexUnityList[1].id]);
  }

};