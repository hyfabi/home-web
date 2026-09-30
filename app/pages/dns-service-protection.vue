<script setup lang="ts">

import {onMounted, onUnmounted, ref, watch} from 'vue'

const MAX_ENTRIES = 2;

const refreshRate = ref(5)
const logs = ref<any[]>([])
const pending = ref(false)
const error = ref(null)

const { data, refresh } = await useFetch('/api/adguard-logs', {
  server: false,
  immediate: false
})

// Track unique log entries temporarily in memory
const visibleLogs = ref([])

function addNewLogs(logsToCompare: any[]) {
  if(visibleLogs.value.length ==  0) {
    visibleLogs.value = logsToCompare
    return
  }

  const existingTimestamps : string[] = visibleLogs.value.map(log => log.time)
  const newLogs = logsToCompare.filter(newLog => existingTimestamps.find(value => value === newLog.time) == null)
  console.debug(`Added ${newLogs.length} entries`)
  if(newLogs.length !== 0)
    visibleLogs.value.unshift(...newLogs)
}

async function manualRefresh() {
  pending.value = true

  try {
    await refresh()
    if (data.value?.data) {
      addNewLogs(data.value.data)
    }
  } catch (e) {
    error.value = e as any
  } finally {
    pending.value = false
  }
}

let interval: ReturnType<typeof setInterval> | undefined

function startAutoRefresh() {
  if (interval) clearInterval(interval)

  interval = setInterval(() => {
    manualRefresh()
  }, refreshRate.value * 1000)
}

watch(refreshRate, startAutoRefresh)

onMounted(() => {
  manualRefresh()
  startAutoRefresh()
})

onUnmounted(() => {
  if (interval) clearInterval(interval)
})
</script>

<template>
  <v-container>
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
      <tr class="rounded">
        <th><u>Client</u></th>
        <th><u>Dest.</u></th>
      </tr>
      </thead>
      <TransitionGroup
        name="row"
        tag="tbody"
    >
        <tr v-for="record in visibleLogs" :key="record.time" :class="{
          'cached' : record.cached,
          'rejected' : record.reason == 'FilteredBlackList',
        'reason' : record.reason == 'Rewrite'}">
          <td>{{record.client}}</td>
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
          width="30vw"
      />

      <v-icon-btn
          color="primary"
          :loading="pending"
          @click="manualRefresh"
          icon="mdi-refresh"
      >
      </v-icon-btn>
    </div>
  </v-container>
</template>

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