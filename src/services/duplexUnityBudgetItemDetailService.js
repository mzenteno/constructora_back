import { prisma } from "../config/prisma.js";
import { setTx } from "../config/context.js";
import { duplexUnityBudgetItemDetailRepository } from "../repositories/duplexUnityBudgetItemDetailRepository.js";
import { duplexUnityRepository } from "../repositories/duplexUnityRepository.js";

export const duplexUnityBudgetItemDetailService = {
  async create(data) {
    return await duplexUnityBudgetItemDetailRepository.create(data);
  },

  // async findByDuplexUnityBudgetItemId(duplexUnityBudgetItemId) {
  //   const duplexUnityList = await duplexUnityRepository.findByDuplexId(duplexId);
  //   return await duplexUnityBudgetItemRepository.findSumByBudgetItemForDuplexUnity([duplexUnityList[0].id, duplexUnityList[1].id]);
  //   return null;
  // },

  async findByDuplexIdBudgetItemId(duplexId, budgetItemId) {
    return await duplexUnityBudgetItemDetailRepository.findByDuplexIdBudgetItemId(duplexId, budgetItemId);
  },
};
