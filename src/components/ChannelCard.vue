<template>
  <div class="box p-1 m-2" @click="detail()" style="width: 320px; height: 200px;  position: relative; z-index: 1;">
    <div :style="style" class="bg"/>
    <h1 class="title m-2"><b>{{ info.name }}</b></h1>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'
import { channel } from '../plugins/state.js'

const { info } = defineProps(['info'])
const router = useRouter()

const style = {
  background: `url(${info.bg? info.bg: '/bg.jpg'}) center center`
}
const detail = () => {
  channel.value = info
  router.push('/channel/' + info.id)
}

</script>

<style scoped>
.bg {
  position: absolute;
  z-index: -1;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: .3;
  width: 100%;
  height: 100%;
}
</style>
