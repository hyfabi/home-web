
export default function useMqttPublish(topic : string, message : string){
    const { $mqtt } = useNuxtApp()

    $mqtt.publish(topic, message, {
        retain: true
    })
}