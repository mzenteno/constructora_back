import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const UserRepository = {

  async create(data) {
    return await prisma.user.create({
      data: {
        userName: data.userName,
        fullName: data.fullName,
        email: data.email,
        password: data.password,
        isActive: data.isActive
      }
    });
  },

  async update(id, data) {
    return await prisma.user.update({
      where: { id },
      data: {
        userName : data.userName,
        fullName : data.fullName,
        email : data.email
      }
    });
  },

  async delete(id) {
    return await prisma.user.update({
      where: { id },
      data: {
        isActive : false
      }
    });
  },

  async findAll() {
    return await prisma.user.findMany({
      select: {
        id: true,
        userName: true,
        fullName: true,
        email: true
      },
      orderBy: {
        userName: 'asc'
      },
      where: { isActive: true }
    });
  },

  async findById(id) {
    return await prisma.user.findUnique({
      select: {
        id: true,
        userName: true,
        fullName: true,
        email: true,
        isActive: true
      },
      where: { id }
    });
  }

}