<script setup lang="ts">
import Clock from "~/pages/Clock.vue";

definePageMeta({
  layout: 'default'
})
</script>

<template>
  <main>
    <Clock/>
  </main>
</template>

<style scoped>
  main{
    margin: 0 8px;
  }
</style>