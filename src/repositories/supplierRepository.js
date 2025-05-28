import { prisma } from '../config/prisma.js';
import { getTx } from '../config/context.js';

function db() {
  return getTx() || prisma;
}

export const supplierRepository = {
  
  async create(data) {
    return await db().supplier.create({
      data: { 
        fullName: data.fullName,
        phone: data.phone,
        email: data.email,
        documentNumber: data.documentNumber,
        address: data.address
       }
    });
  },

  async update(id, data) {
    return await db().supplier.update({
      where: { id },
      data: { 
        fullName: data.fullName,
        phone: data.phone,
        email: data.email,
        documentNumber: data.documentNumber,
        address: data.address
       }
    });    
  },

  async delete(id) {
    return await db().supplier.delete({
      where: { id }
    });
  },

  async findAll(filters = {}) {
    const { fullName, phone, email, documentNumber, address } = filters;

    let whereCondition = {};    
    if (fullName) {
      whereCondition.fullName = { contains: fullName, mode: 'insensitive' };
    }
    if (phone) {
      whereCondition.phone = { contains: phone, mode: 'insensitive' };
    }
    if (email) {
      whereCondition.email = { contains: email, mode: 'insensitive' };
    }
    if (documentNumber) {
      whereCondition.documentNumber = { contains: documentNumber, mode: 'insensitive' };
    }
    if (address) {
      whereCondition.address = { contains: address, mode: 'insensitive' };
    }

    return await db().supplier.findMany({
      where: whereCondition,
      select: {
        id: true,
        fullName: true,
        phone: true,
        email: true,
        documentNumber: true,
        address: true
      },
      orderBy: {
        fullName: 'asc'
      }
    });
  },

  async findById(id) {
    return await db().supplier.findUnique({
      select: {
        id: true,
        fullName: true,
        phone: true,
        email: true,
        documentNumber: true,
        address: true
      },
      where: { id }
    });
  }

}