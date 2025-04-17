<script setup lang="ts">
import {useMqttSubscribe} from "~/composables/useMqttSubscribe";
import useMqttPublish from "~/composables/useMqttPublish";

const { $mqtt } = useNuxtApp()

const message = useMqttSubscribe('test/topic')

const inputModel = ref("")

function sendMessage() {
  console.debug('sendMessage', inputModel);
  useMqttPublish("test/topic", inputModel.value)
}
</script>

<template>
  <article>
    <button @click="sendMessage">sendMessage</button>
    <input v-model="inputModel" type="text" >
    <p>{{ message }}</p>
  </article>
</template>

<style scoped>

</style>