import { prisma } from "../config/prisma.js";
import { format } from "date-fns";
import { getTx } from "../config/context.js";

function db() {
  return getTx() || prisma;
}

export const duplexUnityBudgetItemDetailRepository = {
  async create(data) {
    return await db().duplexUnityBudgetItemDetail.create({
      data: {
        duplexUnityBudgetItemId: data.duplexUnityBudgetItemId,
        createAt: data.createAt,
        total: data.total,
        description: data.description,
      },
    });
  },

  async findByDuplexUnityBudgetItemId(duplexUnityBudgetItemId) {
    const duplexUnityBudgetItemList = await db().duplexUnityBudgetItem.findMany({
      where: { duplexUnityBudgetItemId },
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
            parentId: true,
          },
        },
      },
    });

    return duplexUnityBudgetItemList.map((item) => ({
      ...item,
      amountBudgete: parseFloat(item.amountBudgete.toString()),
      amountSpent: parseFloat(item.amountSpent.toString()),
      amountReal: parseFloat(item.amountReal.toString()),
    }));
  },

  async findByDuplexIdBudgetItemId(duplexId, budgetItemId) {
    const rows = await db().$queryRaw`
        SELECT 
          create_at AS "createAt", 
          (total*2) AS total, 
          description
        FROM duplex_unity_budget_item_detail dubid
	      LEFT JOIN duplex_unity_budget_item dubi ON dubi.id=dubid.duplex_unity_budget_item_id
        WHERE dubi.budget_item_id=${budgetItemId} AND 
        dubi.duplex_unity_id=(SELECT id FROM duplex_unity WHERE duplex_id=${duplexId} LIMIT 1)`;

    return rows.map((row) => ({
      createAt: format(new Date(row.createAt), "yyyy-MM-dd"),
      total: Number(row.total),
      description: row.description,
    }));
  },
};
