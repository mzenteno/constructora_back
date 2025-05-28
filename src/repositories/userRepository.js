import { prisma } from '../config/prisma.js';
import { getTx } from '../config/context.js';

function db() {
  return getTx() || prisma;
}

export const userRepository = {

  async create(data) {
    return await db().user.create({
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
    return await db().user.update({
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
    return await db().user.update({
      where: { id },
      data: {
        isActive : false
      }
    });
  },

  async findAll() {
    return await db().user.findMany({
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
    return await db().user.findUnique({
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
    return await db().user.findFirst({
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
    return await db().user.findFirst({
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