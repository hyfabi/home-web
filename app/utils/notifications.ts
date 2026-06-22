export async function subscribeToPush() {
    const registration = await navigator.serviceWorker.ready

    const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
            useRuntimeConfig().public.vapidPublicKey
        )
    })

    await $fetch('/api/push/subscribe', {
        method: 'POST',
        body: subscription
    })
}