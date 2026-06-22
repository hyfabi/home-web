export default defineEventHandler(async (event) => {
    const subscription = await readBody(event)

    // save in database
    console.log(subscription)

    return { success: true }
})