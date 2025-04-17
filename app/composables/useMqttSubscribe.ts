// composables/useMqttSubscribe.ts
export const useMqttSubscribe = (topic: string) => {
    const { $mqtt } = useNuxtApp()
    const message = ref<string | null>(null)

    onMounted(() => {
        if (!$mqtt) return

        const handleMessage = (t: string, payload: Buffer) => {
            if (t === topic) {
                message.value = payload.toString()
            }
        }

        // Wait until connected before subscribing
        if (!$mqtt.connected) {
            $mqtt.on('connect', () => {
                $mqtt.subscribe(topic)
            })
        } else {
            $mqtt.subscribe(topic, function(err, grantedQos) {
                if (err) {
                    console.error('Error subscribing:', err);
                } else {
                    console.log('Subscribed with granted QoS:', grantedQos);
                }
            })
        }

        $mqtt.on('message', handleMessage)

        // Clean up on unmount
        onBeforeUnmount(() => {
            $mqtt.off('message', handleMessage)
            $mqtt.unsubscribe(topic)
        })
    })

    return message
}
