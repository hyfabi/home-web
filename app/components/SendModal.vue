<template>
  <div>
    <!-- Icon Button to open modal -->
    <v-btn icon @click="dialog = true" color="primary">
      <v-icon>mdi-send</v-icon>
    </v-btn>

    <!-- Modal / Dialog -->
    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title>
          <span class="text-h6">Send Message</span>
        </v-card-title>

        <v-card-text>
          <v-form @submit.prevent="handleSend">
            <v-text-field
                v-model="message"
                label="Your message"
                required
            ></v-text-field>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="dialog = false">Cancel</v-btn>
          <v-btn color="primary" @click="handleSend">Send</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const dialog = ref(false)
const message = ref('')

const handleSend = () => {
  console.log('Sending message:', message.value)
  // Add your logic here (e.g. emit event, call API)
  dialog.value = false
  message.value = ''
}
</script>
