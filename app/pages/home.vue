<script setup lang="ts">
import DnsServiceProtection from "~/pages/dns-service-protection.vue";

definePageMeta({
  layout: 'default'
})
</script>

<template>
  <main>
    <DnsServiceProtection/>
  </main>
</template>

<style scoped>
  main{
    margin: 0 8px;
  }
</style>