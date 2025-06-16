import { prisma } from '../config/prisma.js';
import { setTx } from '../config/context.js';
import { appError } from '../config/appError.js';
import { duplexRepository } from '../repositories/duplexRepository.js';
import { duplexUnityRepository } from '../repositories/duplexUnityRepository.js';
import { budgetItemRepository } from '../repositories/budgetItemRepository.js';

export const duplexService = {
  
  async create(data) {
    if (!data.code || !data.description) {
      throw new appError('All fields are required', 400);
    }

    console.log(data);

    // Obtener lista de budget
    const budgetList = await budgetItemRepository.findAll();
    
    return await prisma.$transaction(async (tx) => {
      setTx(tx);

      const duplex =  await duplexRepository.create({ 
        code: data.code, 
        description: data.description, 
        address: data.address,
        subTotalSpent: 0,
        contractorsFee: 0,
        deposit1: 0,
        deposit2: 0
      });
      
      const duplexUnityBudgetItems = [];
      for (const unity of data.duplexUnities) {
        // Insertar duplexUnity
        const duplexUnity = await duplexUnityRepository.create({
          code: unity.code,
          description: unity.description,
          duplexId: duplex.id 
        });

        // Prepara todos los budget items para insertar        
        for (const budgetItem of budgetList) {
          duplexUnityBudgetItems.push({
            duplexUnityId: duplexUnity.id,
            budgetItemId: budgetItem.id,
            amountBudgete: 0,
            amountSpent: 0,
            amountReal: 0
          });
        }
      }

      // Inserta todos los budget items en lote
      await tx.duplexUnityBudgetItem.createMany({
        data: duplexUnityBudgetItems
      });

      return duplex;
    });
  },

  async update(id, data) {
    if (!data.code || !data.description) {
      throw new appError('All fields are required', 400);
    }

    return await duplexRepository.update(id, data);
  },

  async updateSubTotalSpent(id, data) {
    return await duplexRepository.updateSubTotalSpent(id, data);
  },

  async updateContractorsDeposit(id, data) {
    return await duplexRepository.updateContractorsDeposit(id, data);
  },

  async delete(id) {
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
  },

  async getNewCode() {
    const code = await duplexRepository.getNewCode();
    return code;
  }

};