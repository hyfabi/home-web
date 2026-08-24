import { createError, getHeader, readBody } from 'h3'

export default defineEventHandler(async (event) => {
    const token = getHeader(event, 'x-webhook-token')

    const payload = await readBody(event)

    console.log('Proxmox webhook:', payload)

    // Example:
    // Save to database
    // Publish via websocket
    // Trigger notifications

    return {
        success: true,
        received: payload
    }
})