import {PrismaClient} from '@prisma/client'

import {membershipTemplates} from "./models/membershipTemplates";
import {users} from "./models/users";

const prisma = new PrismaClient()

function seedModel(model: any, data: object[]) {
    return model.createMany({data, skipDuplicates: true})
}

async function main() {
    await seedModel(prisma.user, users)
    await seedModel(prisma.membershipTemplate, membershipTemplates)
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