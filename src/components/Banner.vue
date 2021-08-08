<template>
  <div class="banner">
    <img :src="props.bg">
    <h1 class="title is-2">
      <span>{{ props.title }}</span>
    </h1>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
const props = defineProps(['bg', 'title'])
</script>

<style scoped>
div.banner {
  height: 160px;
  margin-bottom: 64px;
  width: 100%;
  position: relative;
}
div.banner img {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
div.banner h1 {
  position: absolute;
  left: 10vw;
  bottom: -16px;
}
div.banner span {
  background-color: rgba(255, 255, 255, 0.8);
  padding: 8px 16px;
  border-radius: 8px;
}
</style>