<script setup lang="ts">
import {useMqttSubscribe} from "~/composables/useMqttSubscribe";
import useMqttPublish from "~/composables/useMqttPublish";
import {mqttTopics} from "~/utils/mqttTopics";

definePageMeta({
  layout: 'default'
})

let message = ref('');
let showDialog = ref('');
let dialogText = ref('');

onMounted(() => {
  message.value = useMqttSubscribe(mqttTopics.motd)

  showDialog.value = ref(false)
  dialogText.value = 'Set Message of today!'
})

function sendMessageOfTheDay(motd : string) {
  console.debug('sendMessage', motd);
  useMqttPublish(mqttTopics.motd, motd)
}



</script>

<template>
  <article>
    <p>{{ message }}</p>

    <v-btn class="upload-btn" icon elevation="15" @click="showDialog = true" v-tooltip="'Set Message of today!'">
      <v-icon>mdi-publish</v-icon>
    </v-btn>


    <SendModal
        v-model="showDialog"
        :text="dialogText"
        :on-send="sendMessageOfTheDay"
    />
  </article>
</template>

<style scoped>
.upload-btn{
  position: fixed;
  bottom: 10px;
  right: 10px;
}
</style>