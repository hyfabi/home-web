<template>
  <v-dialog v-model="modelValue" max-width="400">
    <v-card>
      <v-card-title>{{ text }}</v-card-title>
      <v-card-text>
        <v-text-field v-model="input" label="Type something..." />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" @click="handleSend">Send</v-btn>
        <v-btn text @click="modelValue = false">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
const props = defineProps({
  text: String,
  modelValue: Boolean,
  onSend: Function
})

const emit = defineEmits(['update:modelValue'])

const input = ref('')

// 2-way binding support
const modelValue = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

function handleSend() {
  if (props.onSend) props.onSend(input.value)
  modelValue.value = false
}
</script>
