<template>
  <div class="list">
    <button v-if="channel.permission > 0 && !editor" class="button is-primary write" @click="write">
      <span class="icon">
        <i class="mdi mdi-24px mdi-pencil" />
      </span>
    </button>
    <discuss-card v-for="n in all" :key="n._id" :info="n" />
    <infinite-loading :identifier="cid" @infinite="load">
      <template v-slot:no-more>没有更多内容啦！</template>
      <template v-slot:no-results>暂时还没有内容呢</template>
    </infinite-loading>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { SS, channel, editor, discuss, keyword, result, list } from '../plugins/state.js'
import { getList, getChannel } from '../plugins/action.js'
import template from '../plugins/template.js'

import InfiniteLoading from 'vue-infinite-loading'
import DiscussCard from '../components/DiscussCard.vue'

// init
const router = useRouter(), route = useRoute()
const cid = route.params.id
discuss.value = null
if (!SS.token) {
  Swal.fire('错误', '请先登录', 'error')
    .then(() => router.push('/'))
} else {
  if (!channel.value.name) getChannel(cid)
}

async function load ($state) {
  const ts = list.value.length && list.value[list.value.length - 1].timestamp
  const res = await getList(cid, ts)
  if (res && res.length) $state.loaded()
  else $state.complete()
}

const all = $computed(() => {
  const map = []
  const res = []
  for (const n of list.value) {
    if (keyword.value) {
      const reg = new RegExp(keyword.value, 'i')
      let pass = false
      if (reg.test(n.title)) pass = true
      if (reg.test(n.publisher)) pass = true
      if (!pass) continue
    }
    if (!map[n._id]) {
      res.push(n)
      map[n._id] = true
    }
  }
  for (const n of result.value) {
    if (!map[n._id]) {
      res.push(n)
      map[n._id] = true
    }
  }
  res.sort((a, b) => (b.pin - a.pin) || (b.timestamp - a.timestamp))
  return res
})

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
.list {
  min-height: 93vh;
  background-color: #ddd;
  margin: 0;
  padding: 2vh 3%;
  display: flex;
  flex-direction: column;
}

.write {
  position: fixed;
  bottom: 5vh;
  right: 5vh;
  z-index: 100;
  border-radius: 888px;
  width: 4rem;
  height: 4rem;
}
</style>