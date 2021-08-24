<template>
  <div class="box p-1" @click="detail(info._id)" :style="cardStyle">
    <h1 class="subtitle m-2"><b>{{ info.title }}</b></h1>
    <span v-for="(tag, index) in info.tag" :key="index" class="tag is-info is-light ml-2">{{ tag }}</span>
    <p class="p-2" style="color: #757575;">{{ info.author }} &#8287; {{parseDate(info.timestamp) }}</p>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'
const tzoffset = (new Date()).getTimezoneOffset() * 60000
const { info } = defineProps(['info'])
const router = useRouter()

const cardStyle = $computed(() => {
  if (info._id.indexOf('HOME') === 0) return { borderLeft: '4px solid #5ECDB3' }
  if (info.pin) return { borderLeft: '4px solid #5ECDB3' }
  return {}
})

const parseDate = (timestamp) => {
  if (!timestamp || typeof (timestamp) === 'undefined') return
  const s = new Date(timestamp - tzoffset).toISOString().split('T')
  const date = s[0]
  const time = s[1].substr(0, 8)
  return date + ' ' + time
}

const detail = (id) => {
  router.push('/discuss/' + id)
}
</script>

<style scoped>
div.box {
  margin: 8px 6%;
  cursor: pointer;
  transition: all 0.3s ease;
}
div.box:hover {
  transform: scaleX(1.04);
}
</style>
