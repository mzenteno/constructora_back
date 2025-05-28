import { prisma } from '../config/prisma.js';
import { getTx } from '../config/context.js';

function db() {
  return getTx() || prisma;
}

export const landRepository = {
  
  async create(data) {
    return await db().land.create({
      data: { 
        code: data.code,
        ubication: data.ubication,
        price: data.price,
        description: data.description,
        sold: data.sold,
        supplierId: data.supplierId
       }
    });
  },

  async update(id, data) {
    return await db().land.update({
      where: { id },
      data: { 
        code: data.code,
        ubication: data.ubication,
        price: data.price,
        description: data.description,
        sold: data.sold,
        supplierId: data.supplierId
       }
    });
  },

  async delete(id) {
    return await db().land.delete({
      where: { id }
    });
  },

  async findAll(filters = {}) {
    const { code, ubication, description, sold, supplierId } = filters;

    let whereCondition = {};    
    if (code) {
      whereCondition.code = { 
        contains: code,
        mode: 'insensitive'
      };
    }
    if (ubication) {
      whereCondition.ubication = { 
        contains: ubication,
        mode: 'insensitive'
      };
    }
    if (description) {
      whereCondition.description = { 
        contains: description,
        mode: 'insensitive'
      };
    }
    if (sold === 'true') {
      whereCondition.sold = true;
    } else if (sold === 'false') {
      whereCondition.sold = false;
    }
    if (supplierId) {
      whereCondition.supplierId = parseInt(supplierId);
    }

    const lands = await db().land.findMany({
      where: whereCondition,
      select: {
        id: true,
        code: true,
        ubication: true,
        price: true,
        description: true,
        sold: true,
        supplier: {
          select: {
            id: true,
            fullName: true
          }
        }
      },
      orderBy: {
        code: 'asc'
      }
    });

    return lands.map(land => ({
      ...land,
      price: parseFloat(land.price.toString()),
    }));
  },

  async findById(id) {
    const land = await db().land.findUnique({
      select: {
        id: true,
        code: true,
        ubication: true,
        price: true,
        description: true,
        sold: true,
        supplier: {
          select: {
            id: true,
            fullName: true
          }
        }
      },
      where: { id }
    });

     return {
          ...land,
          price: parseFloat(land.price.toString())
        };
  }

}