<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <v-card class="pa-6 text-center elevation-12" rounded="xl">
      <v-card-title class="text-h4 font-weight-bold">Current Time</v-card-title>
      <v-card-text class="text-h2 font-mono d-flex justify-center align-center">
        <span>{{ hours }}:{{ minutes }}:</span>
        <transition name="fade-slide">
          <span :key="seconds" class="ml-1">{{ seconds }}</span>
        </transition>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const hours = ref('')
const minutes = ref('')
const seconds = ref('')
let intervalId = null

function updateTime() {
  const now = new Date()
  hours.value = String(now.getHours()).padStart(2, '0')
  minutes.value = String(now.getMinutes()).padStart(2, '0')
  seconds.value = String(now.getSeconds()).padStart(2, '0')
}

onMounted(() => {
  updateTime()
  intervalId = setInterval(updateTime, 1000)
})

onBeforeUnmount(() => {
  clearInterval(intervalId)
})
</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.4s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
