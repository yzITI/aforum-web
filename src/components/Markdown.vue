<template>
  <div class="markdown-container content" v-html="md" />
</template>

<script setup>
import { computed, defineProps, nextTick } from 'vue'

const mmp = window.markdownit({ html: true })
const props = defineProps(['content'])
const md = computed(() => {
  nextTick(() => {
    window.MathJax.typeset()
  })
  return mmp.render(props.content)
})
</script>

<style>
.markdown-container * {
  max-width: 100%;
}

.markdown-container blockquote {
  padding: 10px;
  margin: 10px 0;
  border-left: 5px solid #ccc;
  border-radius: 3px;
}
.markdown-container blockquote * {
  margin: 0;
}
</style>