import { prisma } from '../config/prisma.js';
import { getTx } from '../config/context.js';

function db() {
  return getTx() || prisma;
}

export const duplexRepository = {
  async create(data) {
    return await db().duplex.create({
      data: {
        code: data.code,
        description: data.description,
        address: data.address,
        subTotalSpent: 0,
        contractorsFee: 0,
        deposit1: 0,
        deposit2: 0
      }
    });
  },

  async update(id, data) {
    return await db().duplex.update({
      where: { id },
      data: {
        code: data.code,
        description: data.description,
        address: data.address,
        duplexUnities: {
          update: data.duplexUnities.map((u) => ({
            where: { id: u.id },
            data: {
              code: u.code,
              description: u.description
            },
          })),
        }
      }
    });
  },

  async updateSubTotalSpent(id, data) {
    return await db().duplex.update({
      where: { id },
      data: {
        subTotalSpent: {
          increment: data.subTotalSpent
        }
      }
    });
  },

  async updateContractorsDeposit(id, data) {
    return await db().duplex.update({
      where: { id },
      data: {
        contractorsFee: data.contractorsFee,
        deposit1: data.deposit1,
        deposit2: data.deposit2
      }
    });
  },

  async delete(id) {
    return await db().duplex.delete({
      where: { id }
    });
  },

  async findAll() {
    return await db().duplex.findMany({
      select: {
        id: true,
        code: true,
        description: true,
        address: true,
        subTotalSpent: true,
        contractorsFee: true,
        deposit1: true,
        deposit2: true
      },
      orderBy: {
        code: 'desc'
      }
    });
  },

  async findById(id) {
    const row = await db().duplex.findUnique({
      select: {
        id: true,
        code: true,
        description: true,
        address: true,
        subTotalSpent: true,
        contractorsFee: true,
        deposit1: true,
        deposit2: true,
        duplexUnities: {
          select: {
            id: true,
            code: true,
            description: true
          }
        }
      },
      where: { id }
    });

    if (!row) return null;

    return {
      ...row,
      subTotalSpent: Number(row.subTotalSpent),
      contractorsFee: Number(row.contractorsFee),
      deposit1: Number(row.deposit1),
      deposit2: Number(row.deposit2)
    };
  },

  async getNewCode() {
    const result = await prisma.$queryRaw`SELECT code FROM duplex WHERE code ~ '^D-\\d{4}$' ORDER BY code DESC LIMIT 1`;

    if (result.length > 0) {
      const lastCode = result[0].code;
      const nextNumber = parseInt(lastCode.split('-')[1]) + 1;
      const newCode = `D-${String(nextNumber).padStart(4, '0')}`;
      return newCode;
    } else {
      return 'D-0001';
    }
  }

}