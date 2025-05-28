import { Prisma } from '@prisma/client';
import { prisma } from '../config/prisma.js';
import { getTx } from '../config/context.js';

function db() {
  return getTx() || prisma;
}

export const duplexUnityBudgetItemRepository = {
  
  async create(data) {
    return await db().duplexUnityBudgetItem.create({
      data: {
        duplexUnityId: data.duplexUnityId,
        budgetItemId: data.budgetItemId,
        amountBudgete: data.amountBudgete,
        amountSpent: data.amountBudgete,
        amountReal: data.amountReal
       }
    });
  },

  async update(id, data) {
    return await db().duplexUnityBudgetItem.update({
      where: { id },
      data: {
        amountBudgete: data.amountBudgete,
        amountSpent: data.amountSpent,
        amountReal: data.amountReal
       }
    });    
  },

  async delete(id) {
    return await db().duplexUnityBudgetItem.delete({
      where: { id }
    });
  },

  async findAll(filters = {}) {
    return await duplexUnityBudgetItem.findMany({
      orderBy: {
        
      }
    });
  },  

  async findById(id) {
    return await db().duplexUnityBudgetItem.findUnique({
      where: { id },
      select: {
      }
    });
  },

  async findByDuplexUnity(duplexUnityId) {
    const duplexUnityBudgetItemList = await db().duplexUnityBudgetItem.findMany({
      where: { duplexUnityId },
      select: {
        id: true,
        amountBudgete: true,
        amountSpent: true,
        amountReal: true,
        budgetItem: {
          select: {
            id: true,
            code: true,
            descriptionEn: true,
            descriptionEs: true,
            unit: true,
            typeItem: true,
            orderItem: true,
            visible: true,
            parentId: true
          },
        }
      }
    });    

    return duplexUnityBudgetItemList.map(item => ({
      ...item,
      amountBudgete: parseFloat(item.amountBudgete.toString()),
      amountSpent: parseFloat(item.amountSpent.toString()),
      amountReal: parseFloat(item.amountReal.toString()),
    }));
  },

async findSumByBudgetItemForDuplexUnity(duplexUnityIds) {
  console.log(duplexUnityIds);
  const rows = await db().$queryRaw`
    SELECT 
      b.id,
      b.code,
      b.description_en AS "descriptionEn",
      b.description_es AS "descriptionEs",
      b.unit,
      b.type_item AS "typeItem",
      b.order_item AS "orderItem",
      b.visible,
      b.parent_id AS "parentId",
      SUM(d.amount_budgete) AS "amountBudgete",
      SUM(d.amount_spent) AS "amountSpent",
      SUM(d.amount_real) AS "amountReal"
    FROM duplex_unity_budget_item d
    JOIN budget_item b ON d.budget_item_id = b.id
    WHERE d.duplex_unity_id IN (${Prisma.join(duplexUnityIds)})
    GROUP BY 
      b.id, b.code, b.description_en, b.description_es,
      b.unit, b.type_item, b.order_item, b.visible, b.parent_id
    ORDER BY b.order_item;
  `;

  return rows.map(row => ({
    amountBudgete: Number(row.amountBudgete),
    amountSpent: Number(row.amountSpent),
    amountReal: Number(row.amountReal),
    budgetItem: {
      id: row.id,
      code: row.code,
      descriptionEn: row.descriptionEn,
      descriptionEs: row.descriptionEs,
      unit: row.unit,
      typeItem: row.typeItem,
      orderItem: row.orderItem,
      visible: row.visible,
      parentId: row.parentId
    }
  }));
},

  async findByDuplexUnityAndBudgetItem(duplexUnityId, budgetItemId) {
    return await db().duplexUnityBudgetItem.findFirst({
      where: {
        duplexUnityId, budgetItemId
      }
    });
  },

}