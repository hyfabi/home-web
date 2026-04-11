<script setup lang="ts">

const router = useRouter();
const routes = ref(router.getRoutes());

const users = ref([]);

</script>

<template>
  <div class="d-flex">
    <v-btn v-for="route in routes" :key="route.path"  :href="route.path">
      {{route.path}}
    </v-btn>



  </div>
</template>

<style scoped>

</style>