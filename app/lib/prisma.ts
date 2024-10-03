import { PrismaClient } from '@prisma/client';
import { log } from '@/utils/logger';

const prismaClientSingleton = () => {
  log('Initializing PrismaClient');
  return new PrismaClient();
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') {
  log('Setting globalForPrisma.prisma in non-production environment');
  globalForPrisma.prisma = prisma;
}

export default prisma;