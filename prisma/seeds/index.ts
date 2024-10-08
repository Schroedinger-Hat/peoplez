import { PrismaClient } from "@prisma/client"
import { membershipTemplatesSeeds } from "./models/membershipTemplates"
import { usersSeeds } from "./models/users"
import { configurablesSeeds } from "./models/configurables"

const prisma = new PrismaClient()

async function seedModel(model: any, data: object[]) {
  await model.createMany({ data, skipDuplicates: true })
  return
}

async function main() {
  await seedModel(prisma.user, usersSeeds)
  await seedModel(prisma.membershipTemplate, membershipTemplatesSeeds)
  await seedModel(prisma.configurable, configurablesSeeds)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
