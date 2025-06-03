import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient({
  transactionOptions: {
    maxWait: 60000,
    timeout: 60000
  },
  log: [
    // { level: 'warn', emit: 'event' },
    // { level: 'info', emit: 'event' },
    { level: 'error', emit: 'event' },
    // { level: 'query', emit: 'event' }
  ]
});

// Manejadores de logs
prisma.$on('warn', (e) => {
  console.warn('Prisma Warn:', e);
});

prisma.$on('info', (e) => {
  console.info('Prisma Info:', e);
});

prisma.$on('error', (e) => {
  console.error('Prisma Error:', e);
});

prisma.$on('query', (e) => {
  console.debug('Prisma Query:', e);
});