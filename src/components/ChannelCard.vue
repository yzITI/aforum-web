<template>
  <div class="channel-card box m-2" @click="go">
    <img :src="info.bg || '/bg.jpg'" onerror="this.src = '/bg.jpg'">
    <h1 class="title m-2">{{ info.name }}</h1>
    <div class="tip" v-if="info.permission">
      <span class="icon">
        <i class="mdi mdi-18px mdi-account"></i>
      </span>
      <span>{{ info.permission > 1 ? '管理员' : '成员' }}</span>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'
import { channel } from '../plugins/state.js'
const { info } = defineProps(['info'])
const router = useRouter()
function go () {
  channel.value = info
  router.push('/channel/' + info._id)
}
</script>

<style scoped>
div.channel-card {
  color: white;
  width: 320px;
  height: 200px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
}
img {
  position: absolute;
  border-radius: 8px;
  width: 320px;
  height: 200px;
  opacity: 0.6;
  transition: all 0.5s ease;
}
img:hover {
  opacity: 0.9;
}
h1 {
  z-index: 2;
  color: white;
  max-width: 90%;
  transition: all 0.2s ease;
}
h1:hover {
  font-size: 2.1rem;
}
div.tip {
  position: absolute;
  bottom: 8px;
  right: 8px;
}
</style>
