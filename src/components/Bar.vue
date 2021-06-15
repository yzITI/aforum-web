<template>
  <div class="bar box m-0" v-if="route.path !== '/'">
    <div style="display: flex;">
      <span class="icon mr-3" @click="home">
        <i class="mdi mdi-36px mdi-home"></i>
      </span>
      <h1 class="title is-4 m-0">{{ route.name }}</h1>
    </div>
    <div v-if="route.path === '/main'" style="display: flex; align-items: center;">
      <input class="input is-outlined" type="text" placeholder="搜索" onfocus="this.placeholder = '回车搜索内容'" onblur="this.placeholder = '搜索'" v-model="keyword" @keyup.enter="searchContent">
      <span class="icon ml-4" v-if="SS.role == 'ADMIN'" @click="router.push('/admin')">
        <i class="mdi mdi-36px mdi-account-cog"></i>
      </span>
    </div>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { keyword, searchContent, SS, topic, draft } from '../plugins/state.js'
const route = useRoute(), router = useRouter()
function home () {
  if (SS.token) {
    if (topic.value) draft.value = { title: '', content: '' }
    router.push('/main')
  }
  else router.push('/') 
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