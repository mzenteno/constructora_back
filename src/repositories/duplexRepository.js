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
        address: data.address
      }
    });
  },

  async update(id, data) {
    console.log("update3");

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
        address: true
      },
      orderBy: {
        description: 'asc'
      }
    });
  },

  async findById(id) {
    return await db().duplex.findUnique({
      select: {
        id: true,
        code: true,
        description: true,
        address: true,
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
  }

}