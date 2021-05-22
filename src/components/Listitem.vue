<template>
  <div class="elevation-2 card" @click="detail(info._id)" :style="cardStyle">
    <div>
      <div style="margin-top: 5px;" class="headline">{{ info.title }}</div>
      <icons :topic="info"></icons>
    </div>
    <div v-for="(tag, index) in info.tag" :key="index" style="margin: 5px 2px;">{{ tag }}</div>
    <div style="margin: 2px;"></div>
    <div no-gutters>
      <div style="padding: 5px; color: #757575;">{{ info.publisher }}</div>
      <div style="padding: 5px; color: #757575;">{{ parseDate(info.timestamp) }}</div>
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps } from 'vue'
const tzoffset = (new Date()).getTimezoneOffset() * 60000
const props = defineProps(['info'])
const info = props.info

const cardStyle = computed(() => {
  if (info._id.indexOf('HOME') === 0) return { borderLeft: '4px solid #DB4437' }
  if (info.pin) return { borderLeft: '4px solid #1e88e5' }
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
  this.$router.push('/topic/' + id)
}

</script>

<style scoped>
  .card {
    border-radius: 5px;
    padding: 10px;
    width: 100%;
    margin: 1vh auto;
    display: inline-block;
    position: relative;
    transition: all 0.5s ease;
    background: white;
  }
  p.property {
    font-size: 0.8rem;
    margin: 10px 10px;
  }
  p.property strong {
    font-size: 0.9rem;
  }
</style>