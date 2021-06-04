<template>
  <div class="bar box m-0" v-if="route.path !== '/'">
    <h1 class="title is-4 m-0" @click="router.push('/main')">{{ route.name }}</h1>
    <input class="input is-outlined" type="text" placeholder="搜索" onfocus="this.placeholder = '回车搜索内容'" onblur="this.placeholder = '搜索'" @keyup.enter="search" v-model="keyword">
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { keyword } from '../plugins/state.js'
const route = useRoute(), router = useRouter()

function search () {
  console.log(keyword.value)
}
</script>

<style scoped>
div.bar {
  border-radius: 0 0 8px 8px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
input {
  width: 8rem;
  transition: all 0.5s ease;
}
input:focus {
  width: min(60vw, 320px);
}
</style>