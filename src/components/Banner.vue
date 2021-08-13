<template>
  <div class="banner">
    <img class="bg" :src="props.bg || '/bg.jpg'" onerror="this.src='/bg.jpg'">
    <div class="header">
      <h1 class="title is-3 m-3">
        <img v-if="props.logo" src="/logo.png" style="width: 2rem; height: 2rem;">
        {{ props.title }}
      </h1>
      <div class="m-3">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
const props = defineProps(['bg', 'title', 'logo'])
</script>

<style scoped>
div.banner {
  min-height: 160px;
  height: 24vh;
  width: 100%;
  position: relative;
}
div.banner img.bg {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
div.header {
  position: absolute;
  cursor: default;
  bottom: 0px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
  transition: all 0.3s ease;
}
div.header:hover {
  padding: 16px 0;
}
</style>