<template>
  <div class="bar box m-0" v-if="!route.path.includes('/channel')">
    <div style="display: flex;">
      <span class="icon mr-3" v-if="route.path !== '/'" @click="router.push('/home/' + SS.channel) " style="cursor: pointer;">
        <i class="mdi mdi-36px mdi-home" />
      </span>
      <h1 class="title is-4 m-0">{{ route.name ? route.name: channel.name }}</h1>
    </div>
    <div v-if="route.path === '/' && !SS.token" style="display: flex; align-items: center;">
      <span class="icon ml-4" @click="login">
        <i class="mdi mdi-36px mdi-login" />
      </span>
    </div>
    <div v-if="route.path.includes('/home')" style="display: flex; align-items: center;">
      <input class="input is-outlined" type="text" placeholder="搜索" onfocus="this.placeholder = '回车搜索内容'" onblur="this.placeholder = '搜索'" v-model="keyword" @keyup.enter="searchContent">
      <span class="icon ml-4" v-if="SS.role == 'ADMIN'" @click="router.push('/admin')" style="cursor: pointer;">
        <i class="mdi mdi-36px mdi-account-cog" />
      </span>
      <h1 class="title is-6 m-0 ml-3" @click="router.push('/')" style="cursor: pointer;">退出频道</h1>
    </div>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { keyword, SS, topic, draft, channel } from '../plugins/state.js'
import { searchContent } from '../plugins/action.js'
const route = useRoute(), router = useRouter()

function login () {
  if (!SS.token) window.location.href = 'https://cn.aauth.link/#/launch/o0Y5hrvbMd'
}
</script>

<style scoped>
div.bar {
  border-radius: 0 0 8px 8px;
  height: 7vh;
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