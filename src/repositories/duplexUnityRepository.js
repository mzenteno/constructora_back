import { prisma } from '../config/prisma.js';
import { getTx } from '../config/context.js';

function db() {
  return getTx() || prisma;
}

export const duplexUnityRepository = {
  async create(data) {
    return await db().duplexUnity.create({
      data: {
        code: data.code,
        description: data.description,
        duplexId: data.duplexId
      }
    });
  },

  async update(id, data) {
    return await db().duplexUnity.update({
      where: { id },
      data: {
        code: data.code,
        description: data.description,
        duplexId: data.duplexId
      }
    });
  },

  async delete(id) {
    return await db().duplexUnity.delete({
      where: { id }
    });
  },

  async findAll() {
    return await db().duplexUnity.findMany({
      select: {
        id: true,
        code: true,
        description: true,
        duplexId: true,
        duplex: {
          select: {
            code: true,
            description: true
          }
        }
      },
      orderBy: {
        description: 'asc'
      }
    });
  },

  async findById(id) {
    return await db().duplexUnity.findUnique({
      select: {
        id: true,
        code: true,
        description: true,
        duplexId: true,
        duplex: {
          select: {
            code: true,
            description: true
          }
        }
      },
      where: { id }
    });
  },

  async findByDuplexId(duplexId) {
    console.log(duplexId);
    return await db().duplexUnity.findMany({
      select: {
        id: true,
        code: true,
        description: true,
        duplexId: true
      },
      where: { duplexId },
      orderBy: {
        description: 'asc'
      }
    });
  }
};