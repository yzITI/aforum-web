<template>
  <div class="bar box m-0" v-if="route.name">
    <div style="display: flex;">
      <span class="icon mr-3" @click="home" style="cursor: pointer;">
        <i class="mdi mdi-36px mdi-home" />
      </span>
      <h1 class="title is-4 m-0">{{ title }}</h1>
    </div>
    <div style="display: flex; align-items: center;">
      <input class="input is-outlined" type="text" placeholder="搜索" onfocus="this.placeholder = '回车全文搜索'" onblur="this.placeholder = '搜索'" v-model="keyword" @keyup.enter="searchContent">
      <span class="icon ml-3" v-if="channel.permission == 2" @click="router.push('/admin/' + channel._id)" style="cursor: pointer;">
        <i class="mdi mdi-24px mdi-cog"></i>
      </span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { keyword, SS, discuss, channel } from '../plugins/state.js'
import { searchContent } from '../plugins/action.js'
const route = useRoute(), router = useRouter()

const title = computed(() => route.name.replace('channel', channel.value.name))

function home () {
  if (channel.value && route.name !== 'channel') router.push('/discuss/' + channel.value._id)
  else router.push('/')
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