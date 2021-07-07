<template>
  <div class="mainclass">
    <button class="button is-primary" style="position: fixed; bottom: 5vh; right: 5vh; z-index: 100; border-radius: 888px; width: 4rem; height: 4rem" @click="router.push('/edit'); topic = null">
      <span class="icon">
        <i class="mdi mdi-24px mdi-pencil" />
      </span>
    </button>
    <list></list>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import List from '../components/List.vue'
import { getList, token, popError } from '../plugins/action.js'
import { SS, channel } from '../plugins/state.js'

const router = useRouter()
if (!SS.token) {
  Swal.fire('错误', '请先登录', 'error')
    .then(() => router.push('/'))
} else {
  setInterval(() => { getList() }, 60000)
  // incase refreshing
  if (SS.channel && !Object.keys(channel.value).length) {
    axios.get('/api/', token())
      .then(res => { 
        for (const c of res.data) {
          if (c._id == SS.channel) {
            channel.value = c;
            getList()
          }
        }
      })
      .catch(popError)
  } else {
    getList()
  }
}

</script>

<style scoped>
.mainclass {
  height: 100%;
}
</style>