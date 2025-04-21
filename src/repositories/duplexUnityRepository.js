import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const duplexUnityRepository = {

  async create(data) {
    return await prisma.duplexUnity.create({
      data: {
        code: data.code,
        description: data.description,
        duplexId: data.duplexId
      }
    });
  },

  async update(id, data) {
    return await prisma.duplexUnity.update({
      where: { id },
      data: {
        code: data.code,
        description: data.description,
        duplexId: data.duplexId
      }
    });
  },

  async delete(id) {
    return await prisma.duplexUnity.delete({
      where: { id }
    });
  },

  async findAll() {
    return await prisma.duplexUnity.findMany({
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
    return await prisma.duplexUnity.findUnique({
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
    return await prisma.duplexUnity.findMany({
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