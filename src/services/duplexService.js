import { prisma } from '../config/prisma.js';
import { setTx } from '../config/context.js';
import { appError } from '../config/appError.js';
import { duplexRepository } from '../repositories/duplexRepository.js';
import { duplexUnityRepository } from '../repositories/duplexUnityRepository.js';
import { budgetItemRepository } from '../repositories/budgetItemRepository.js';
import { duplexUnityBudgetItemRepository } from '../repositories/duplexUnityBudgetItemRepository.js';

export const duplexService = {
  
  async create(data) {
    if (!data.code || !data.description) {
      throw new appError('All fields are required', 400);
    }

    // Obtener lista de budget
    const budgetList = await budgetItemRepository.findAll();
    
    return await prisma.$transaction(async (tx) => {
      setTx(tx);

      const duplex =  await duplexRepository.create({ 
        code: data.code, 
        description: data.description, 
        address: data.address
      });
      
      for (const unity of data.duplexUnities) {
        // Insertar duplexUnity
        const duplexUnity = await duplexUnityRepository.create({
          code: unity.code,
          description: unity.description,
          duplexId: duplex.id 
        });

        // Insertar DuplexUnityBudgetItem por cadad duplexUnity
        for (const budgetItem of budgetList) {
          await duplexUnityBudgetItemRepository.create({
            duplexUnityId: duplexUnity.id,
            budgetItemId: budgetItem.id,
            amountBudgete: 0,
            amountSpent: 0,
            amountReal: 0
          });
        }
      }
    });
  },

  async update(id, data) {
    console.log(id);
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
    console.log("update3");
    const dupĺex = await duplexRepository.findById(id);
    console.log(dupĺex);
    if (!dupĺex) {
      throw new appError('Duplex Not Found', 404);
    }
    return dupĺex;
  }

};