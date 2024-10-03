import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const credentials = await prisma.credential.findMany()
  console.log('Credentials:', credentials)

  const services = await prisma.service.findMany()
  console.log('Services:', services)
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect())