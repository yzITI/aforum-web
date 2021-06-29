<template>
  <div class="p-4 m-4" style="display: flex; flex-wrap: wrap; justify-content: center;">
    <channel-card v-for="c in data" :key="c._id" :info="c"/>
  </div>
</template>

<script setup>
import ChannelCard from '../components/ChannelCard.vue'
import { SS, token } from '../plugins/state.js'

const { data } = await axios.get('/api', SS.token ? {}: token())
console.log(data)
</script>

<style scoped>
.mainclass {
  height: 100%;
}
</style>