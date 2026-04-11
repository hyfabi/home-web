// server/api/users.post.ts

import {prisma} from "~/server/db/prisma";

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    return prisma.user.create({
        data: body
    })
})
