<template>
  <div color="white" fixed>
    <button class="button is-normal" @click="home">
      icon
    </button>
    <div style="padding: 0;">{{ props.title }}</div>
   <div>slot</div>
  </div>
</template>
<script setup>
import { defineProps } from 'vue'
const props = defineProps(['title'])

function home () {
  if (this.$route.name === 'Main') this.$router.push('/')
  else this.$router.push('/main')
}
</script>
