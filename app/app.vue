<template>
  <NuxtLayout>
    <v-app>
      <NuxtPage />
    </v-app>
  </NuxtLayout>
</template>

<script setup lang="ts">

  onMounted(() => {
    console.debug('App mounted.')
    navigateTo('/home')
  })

</script>