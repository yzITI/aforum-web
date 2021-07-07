<template>
  <div class="p-4 m-4" style="display: flex; flex-wrap: wrap; justify-content: center;">
    <p v-if="loading">正在加载频道资源...</p>
    <p v-if="!loading && channel.length === 0">暂无频道资源</p>
    <channel-card v-for="c in channel" :key="c._id" :info="c" />
  </div>
</template>

<script setup>
import ChannelCard from '../components/ChannelCard.vue'
import { token, popError } from '../plugins/action.js'

ref: channel = []
ref: loading = true
axios.get('/api/', token())
  .then(res => { channel = res.data })
  .catch(popError)
  .finally(() => loading = false)

</script>

<style scoped>
.mainclass {
  height: 100%;
}
</style>