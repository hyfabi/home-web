<script setup lang="ts">

</script>

<template>
  <main class="main">
    <slot></slot>
  </main>
</template>

<style scoped>
.main{
  background-color: black;
  width: 100vw;
  height: 100vh;
  position: absolute;
  margin: -8px 0 0 -8px;
}
</style>