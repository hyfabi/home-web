<script setup lang="ts">
import {useMqttSubscribe} from "~/composables/useMqttSubscribe";
import useMqttPublish from "~/composables/useMqttPublish";
import {mqttTopics} from "~/utils/mqttTopics";

definePageMeta({
  layout: 'default'
})

const message = useMqttSubscribe(mqttTopics.motd)

const inputModel = ref("")

watch(message, ()=>console.log(message))

function sendMessage() {
  console.debug('sendMessage', inputModel);
  useMqttPublish("test", inputModel.value)
}
</script>

<template>
  <article>
    <button @click="sendMessage">sendMessage</button>
    <input v-model="inputModel" type="text" >
    <p>{{ message }}</p>

    <v-btn icon="$vuetify">
      Button
    </v-btn>
    <SendModal/>
  </article>
</template>

<style scoped>

</style>