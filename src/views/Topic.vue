<template>
  <div class="d-flex flex-column pt-2 pb-2" style="background-color: #EEEEEE; min-height: 93vh;">
    <h1 v-if="!topic" class="title is-5 m-3">正在载入...</h1>
    <div class="topic m-4" v-else>
      <p class="is-5 p-1" style="color: #757575;">
        {{ parseDate(topic.timestamp) }}
        <br>
        {{ topic.author }}
      </p>
      <h1 class="title m-0 mt-2 is-2">
        {{ topic.title }}
        <div class="buttons is-inline-block">
          <button class="button is-info is-small ml-2 is-light" v-if="topic.permission == 2" @click="edit"><span class="icon"><i class="mdi mdi-18px mdi-pencil"></i></span></button>
          <button class="button is-danger is-small is-light" v-if="topic.permission == 2 && topic._id !== topic.channel" color="error" @click="remove"><span class="icon"><i class="mdi mdi-18px mdi-trash-can-outline"></i></span></button>
        </div>
      </h1>
      <span v-for="(tag, index) in topic.tag" :key="index" class="tag is-info is-light" style="margin: 5px 2px;">{{ tag }}</span>
      <hr>
      <markdown class="m-2" :content="topic.content"></markdown>
    </div>
    <div v-if="SS.token">
      <button class="button is-primary mb-2 ml-4" v-if="topic" :disabled="editor" @click="writeComment">添加回复</button>
    </div>
    <div class="comment ml-4 mr-4 mt-2" v-if="topic && commentList.length">
      <comment class="mb-2" v-for="c in commentList" :key="c._id" :comment='c' />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Markdown from '../components/Markdown.vue'
import Comment from '../components/Comment.vue'
import { SS, topic, comments, editor, channel } from '../plugins/state.js'
import { getTopic, getComments, token, popError } from '../plugins/action.js'

const route = useRoute(), router = useRouter()
const tzoffset = (new Date()).getTimezoneOffset() * 60000

ref: loading = false
ref: keyword = ''

getComments(route.params.id)
getTopic(route.params.id)
  .then(() => { if (!channel.value._id) channel.value._id = topic.value.channel })

const commentList = computed(() => {
  if (!keyword.value) return comments.value
  const reg = new RegExp(keyword.value, 'i')
  return comments.value.filter(x => reg.test(x.content) || reg.test(x.author))
})

function parseDate (timestamp) {
  if (!timestamp || typeof (timestamp) === 'undefined') return
  const s = new Date(timestamp - tzoffset).toISOString().split('T')
  const date = s[0]
  const time = s[1].substr(0, 8)
  return date + ' ' + time
}

function edit () {
  editor.value = {
    _id: topic.value._id,
    content: topic.value.content,
    title: topic.value.title
  }
  if (channel.value.permission > 1) {
    editor.value.public = topic.value.public
    editor.value.pin = Boolean(topic.value.pin)
    editor.value.hide = topic.value.hide
    editor.value.restrict = topic.value.restrict
    editor.value.tag = topic.value.tag
  }
}

function writeComment () {
  editor.value = {
    _id: Math.random().toString(36).substr(2),
    content: ''
  }
  if (topic.value.anonymous) editor.value.author = false
}

async function remove () {
  const r = await Swal.fire({
    title: '你确定要删除吗？',
    text: '所有回复也会被删除',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
  if (!r.isConfirmed) return

  loading = true
  axios.delete(`/api/topic/${route.params.id}`, token())
    .then(res => {
      Swal.fire('成功', res.data, 'success')
        .then(() => { router.push('/discuss/' + channel.value._id) })
    })
    .catch(err => { Swal.fire('错误', err.response ? err.response.data : '网络错误', 'error') })
    .finally(() => loading = false)
}
</script>

<style scoped>
.topic, .comment {
  background-color: white;
  padding: 0 20px 10px 20px;
  border-radius: 10px;
  position: relative;
}
.comment {
  background-color: #EEEEEE;
  padding: 0px;
}
</style>