<script setup lang="ts">
  definePageMeta({
    layout: 'default'
  })

  watch("test", console.debug)

  useState("test", () => true).value = false

</script>

<template>
  <main class="main">
    <h1>Dev</h1>
  </main>
</template>

<style scoped>
  .main {
    display: flex;
    background-color: black;
  }
</style>