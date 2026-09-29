// server/api/adguard-logs.get.ts
export default defineEventHandler(async () => {
    return await $fetch(
        `${process.env.ADGUARD_URL}/control/querylog`,
        {
            query: { limit: 20 },
            headers: {
                Authorization: `Basic ${Buffer.from(
                    `${process.env.ADGUARD_USER}:${process.env.ADGUARD_PASSWORD}`
                ).toString('base64')}`
            }
        }
    )
})

