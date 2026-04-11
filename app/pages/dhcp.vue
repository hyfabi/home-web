<script setup lang="ts">
  const dataRef = ref([]);


</script>

<template>
  <main>
    <div v-for="item in dataRef" v-bind:key="item.id">

    </div>
  </main>
</template>

<style scoped>

</style>