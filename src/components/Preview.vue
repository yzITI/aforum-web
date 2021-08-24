<template>
  <div class="modal is-active" v-if="md">
    <div class="modal-background" @click="md = false" />
    <div class="modal-content box">
      <markdown :content="props.content" />
    </div>
  </div>
</template>

<script setup>
import { defineProps, watch } from 'vue'
import Markdown from './Markdown.vue'
const props = defineProps(['random', 'content'])
let md = $ref(false)

watch(() => props.random, () => { md = props.random })

</script>