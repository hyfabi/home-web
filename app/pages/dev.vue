<script setup lang="ts">
import {subscribeToPush} from "~/utils/notifications";

definePageMeta({
    layout: 'default'
  })

  watch("test", console.debug)

  useState("test", () => true).value = false

</script>

<template>
  <main class="main">
    <h1>Dev</h1>
    <button @click="subscribeToPush()">
      Enable Notifications
    </button>
  </main>
</template>

<style scoped>
  .main {
    display: flex;
    background-color: black;
  }
</style>