import webpush from 'web-push'

webpush.setVapidDetails(
    'mailto:you@example.com',
    process.env.VAPID_PUBLIC_KEY!,
    process.env.VAPID_PRIVATE_KEY!
)

export default defineEventHandler(async () => {
    const subscription = await getSubscriptionFromDb()

    await webpush.sendNotification(
        subscription,
        JSON.stringify({
            title: 'New Message',
            body: 'Hello from Nuxt!'
        })
    )

    return { success: true }
})