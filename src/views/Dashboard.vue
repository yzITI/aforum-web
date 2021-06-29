<template>
  <div class="p-4 m-4" style="display: flex; flex-wrap: wrap; justify-content: center;">
    <channel-card v-for="c in channel" :key="c._id" :info="c" />
  </div>
</template>

<script setup>
import ChannelCard from '../components/ChannelCard.vue'
import { token, popError } from '../plugins/action.js'

ref: channel = []
axios.get('/api', token())
  .then(res => { channel = res.data})
  .catch(popError)

</script>

<style scoped>
.mainclass {
  height: 100%;
}
</style>