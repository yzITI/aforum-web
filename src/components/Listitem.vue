<template>
  <div class="box p-1 m-1" @click="detail(info._id)" :style="cardStyle">
    <div>
      <h1 style="margin-top: 5px;" class="title is-4">{{ info.title }}</h1>
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
import { useRouter } from 'vue-router'
const tzoffset = (new Date()).getTimezoneOffset() * 60000
const props = defineProps(['info'])
const info = props.info
const router = useRouter()

const cardStyle = computed(() => {
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
  router.push('/topic/' + id)
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