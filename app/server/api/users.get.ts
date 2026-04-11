// server/api/users.get.ts

import {prisma} from "~/server/db/prisma";

export default defineEventHandler(async () => {
    return prisma.user.findMany()
})
