<template>
  <div class="discuss">
    <button v-if="channel.permission > 0 && !editor" class="button is-primary" style="position: fixed; bottom: 5vh; right: 5vh; z-index: 100; border-radius: 888px; width: 4rem; height: 4rem" @click="write">
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
import { SS, channel, editor, topic } from '../plugins/state.js'
import template from '../plugins/template.js'
const router = useRouter()

topic.value = null

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

function write() {
  editor.value = {
    _id: Math.random().toString(36).substr(2),
    content: template,
    title: ''
  }
  if (channel.value.anonymous) {
    editor.value.author = false
    editor.value.anonymous = false
  }
  if (channel.value.permission > 1) {
    editor.value.public = false
    editor.value.pin = false
    editor.value.hide = false
    editor.value.restrict = false
    editor.value.tag = []
  }
}
</script>

<style scoped>
.discuss {
  min-height: 93vh;
  background-color: #ddd;
  margin: 0;
  display: flex;
  flex-direction: column;
}
</style>