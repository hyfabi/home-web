<script setup lang="ts">
import {useMqttSubscribe} from "~/composables/useMqttSubscribe";
import useMqttPublish from "~/composables/useMqttPublish";

const message = useMqttSubscribe('test')

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
  </article>
</template>

<style scoped>

</style>