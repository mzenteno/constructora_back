import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const duplexRepository = {

  async create(data) {
    console.log(data);
    return await prisma.duplex.create({
      data: {
        code: data.code,
        description: data.description,
        address: data.address,
        duplexUnities: {
          create: data.duplexUnities.map((u) => ({
            code: u.code,
            description: u.description
          }))
        }
      }
    });
  },

  async update(id, data) {
    return await prisma.duplex.update({
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
    return await prisma.duplex.delete({
      where: { id }
    });
  },

  async findAll() {
    return await prisma.duplex.findMany({
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
    return await prisma.duplex.findUnique({
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