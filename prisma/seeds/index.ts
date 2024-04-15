import {PrismaClient} from '@prisma/client'

import {membershipTemplates} from "./membershipTemplates";
import {users} from "./users";

const prisma = new PrismaClient()

async function main() {
    await prisma.user.createMany({
        data: users,
        skipDuplicates: true
    })

    await prisma.membershipTemplate.createMany({
        data: membershipTemplates,
        skipDuplicates: true
    })
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