<template>
  <div v-if="props.loading">
    <div>progress circular</div>
    <p>{{ props.message }}</p>
  </div>
</template>

<script>
import { defineProps } from 'vue'
const props = defineProps(['loading, message'])
</script>
