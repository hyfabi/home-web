

<template>
  <div>
    <h1>Dns Service Protection</h1>
    <div v-if="data === undefined">Loading...</div>
    <div v-else-if="error">Something went wrong</div>
    <v-table
        v-else
        class="bg-transparent"
        gridlines="vertical"
        hover
        density="compact"
        fixed-header>
      <thead>
      <tr>
        <th><u>Client</u></th>
        <th><u>Dest.</u></th>
      </tr>
      </thead>
      <TransitionGroup
        name="row"
        tag="tbody"
    >
        <tr v-for="record in data.data" :key="record.time" :class="{
          'cached' : record.cached,
          'rejected' : record.reason == 'FilteredBlackList',
        'reason' : record.reason == 'Rewrite'}">
          <td >{{record.client}}</td>
          <td>{{record.question.name}}</td>
        </tr>
      </TransitionGroup>
    </v-table>
    <div class="d-flex align-center ga-4 mb-4 refresh-controls">
      <span class="text-body-2">
        {{ refreshRate }}
      </span>
      <v-slider
          v-model="refreshRate"
          min="1"
          max="30"
          step="1"
          thumb-label
          hide-details
          width="40vw"
      />

      <v-btn
          color="primary"
          :loading="pending"
          @click="manualRefresh"
      >
        <v-icon start>
          mdi-refresh
        </v-icon>

        Refresh
      </v-btn>
    </div>
  </div>
</template>
<script setup lang="ts">

</script>

<script setup lang="ts">

const { data, pending, error, refresh } = await useFetch('/api/adguard-logs')

definePageMeta({
  layout: 'default'
})

useHead({
  link: [
    {
      rel: 'stylesheet',
      href: 'https://api.fontshare.com/v2/css?f[]=outfit@400&display=swap'
    }
  ]
})

let interval: ReturnType<typeof setInterval> | undefined
const refreshRate = ref(5)


function startAutoRefresh() {
  if (interval) {
    clearInterval(interval)
  }

  interval = setInterval(() => {
    refresh()
  }, refreshRate.value * 1000)
}

function manualRefresh() {
  refresh({
    cause: "refresh:manual"
  })
  startAutoRefresh()
}

watch(refreshRate, () => {
  startAutoRefresh()
})

onMounted(() => {
  startAutoRefresh()
})

onUnmounted(() => {
  if (interval) {
    clearInterval(interval)
  }
})
</script>

<style scoped>
  *{
    font-family: 'Outfit', sans-serif;
  }

  .cached{
    color: greenyellow;
    font-weight: lighter;
  }
  .reason{
    color: lightblue;
  }
  .rejected{
    color: darkred;
  }

  .refresh-controls {
    position: fixed;
    right: 24px;
    bottom: 24px;
    z-index: 1000;

    display: flex;
    align-items: center;
    gap: 16px;

    padding: 12px 16px;
    border-radius: 12px;

    background: transparent;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  }

  .row-enter-active,
  .row-leave-active {
    transition: all 0.4s ease;
  }

  .row-enter-from {
    opacity: 0;
    transform: translateY(-10px);
  }

  .row-leave-to {
    opacity: 0;
    transform: translateY(10px);
  }

  .row-move {
    transition: transform 0.4s ease;
  }
</style>