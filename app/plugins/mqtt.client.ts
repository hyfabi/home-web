import mqtt from 'mqtt'

const port = 1883;

export default defineNuxtPlugin(() => {
    const mqttIsConnected = useState<boolean>('mqtt:isConnected', () => false);

    const config = useRuntimeConfig()

    const client = mqtt.connect(`ws://${config.public.mqttServerBaseUrl}:${port}`, {
        clientId: process.env.CLIENT,
    }) // Use your broker URL

    client.on('connect', () => mqttIsConnected.value = true)
    client.on('disconnect', () => mqttIsConnected.value = false)
    client.on('error', () => mqttIsConnected.value = false)

    watch(mqttIsConnected, console.debug)

    client.on('message', (topic, message) => {
        console.log(`Received on ${topic}: ${message.toString()}`)
        useState(`${topic}`).value = message.toJSON();
    })

    return {
        provide: {
            mqtt: client
        }
    }
})