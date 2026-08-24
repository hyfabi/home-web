<script setup lang="ts">

import HomeComponent from "~/components/HomeComponent.vue";

definePageMeta({
  layout: 'default'
})

</script>

<template>
  <main>
    <v-row>
      <HomeComponent/>
    </v-row>
  </main>
</template>

<style scoped>
  main{
    display: flex;
    flex-grow: 1;
    margin: 0 8px;
    flex-direction: column;
  }
</style>