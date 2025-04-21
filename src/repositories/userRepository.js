import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const userRepository = {

  async create(data) {
    return await prisma.user.create({
      data: {
        userName: data.userName,
        fullName: data.fullName,
        email: data.email,
        password: data.password,
        isActive : data.isActive
      }
    });
  },

  async update(id, data) {
    console.log(data);
    return await prisma.user.update({
      where: { id },
      data: {
        userName : data.userName,
        fullName : data.fullName,
        email : data.email,
        isActive : data.isActive
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
  },

  async findByUserName(userName) {
    return await prisma.user.findFirst({
      select: {
        id: true,
        userName: true,
        fullName: true,
        email: true,
        password: true,
        isActive: true
      },
      where: {userName}
    });
  },

  async findByEmail(email) {
    return await prisma.user.findFirst({
      select: {
        id: true
      },
      where: {
        email: {
          equals: email.toLowerCase(),
          mode: 'insensitive'
        }
      }
    });
  }

}