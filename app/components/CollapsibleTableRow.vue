<script setup lang="ts">
import {ref} from 'vue'

const props = withDefaults(
    defineProps<{
      items: any[]
      initiallyExpanded?: boolean
    }>(),
    {
      initiallyExpanded: false,
    },
)

const expanded = ref(props.initiallyExpanded)

const toggle = () => {
  if(props.items.length > 1)
  expanded.value = !expanded.value
}

const getRowClass = (record: any) => ({
  cached: record.cached,
  rejected: record.reason === 'FilteredBlackList',
  reason: record.reason === 'Rewrite',
})


</script>

<template>
  <!-- Collapsed group -->
  <tr
      class="collapsible-row"
      :class="getRowClass(items[0])"
      @click="toggle"
  >

      <td class="d-flex align-center">
        <v-icon
          v-if="items && items.length > 1"
          size="small"
class="mr-auto"
      >
        {{ expanded ? 'mdi-chevron-down' : 'mdi-chevron-right' }}
      </v-icon>
        <span class="ml-auto">{{ items[0]!.client }}</span>
      </td>
      <td class="wrap-anywhere">{{ items[0]!.question?.name }}</td>

  </tr>

  <!-- Records -->
  <template v-if="expanded">
    <tr
        v-for="record in items"
        :key="record._key"
        class="text-right"
        :class="getRowClass(record)"
    >
      <td class="ml-auto">
        <span>{{ record.client }}</span>
      </td>
      <td>{{ record.question?.name }}</td>
    </tr>
  </template>
</template>

<style scoped>
.collapsible-row {
  cursor: pointer;
  user-select: none;
  font-size: .9em;
}

.collapsible-row:hover {
  background: rgba(var(--v-theme-on-surface), 0.04);
}

.cached {
  color: greenyellow;
  font-weight: lighter;
}

.reason {
  color: lightblue;
}

.rejected {
  color: darkred;
}
</style>
