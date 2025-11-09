<template>
  <div class="loading-container">
    <v-progress-circular
        indeterminate
        color="white"
        size="64"
    />
  </div>
</template>

<script setup>
// No script needed for now
</script>

<style scoped>
.loading-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}
</style>
