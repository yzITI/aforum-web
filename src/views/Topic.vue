<template>
  <div class="d-flex flex-column pt-2 pb-2" style="background-color: #EEEEEE; height: 100%;">
    <div class="topic m-4" v-if="topic">
      <p class="is-5 p-1" style="color: #757575;">
        {{ parseDate(topic.timestamp) }}
        <br>
        {{ topic.author }}
      </p>
      <h1 class="title m-0 mt-2 is-2">
        {{ topic.title }}
        <div class="buttons is-inline-block">
          <button class="button is-info is-small ml-2 is-light" v-if="isAdmin || isPublisher" @click="edit"><span class="icon"><i class="mdi mdi-18px mdi-pencil"></i></span></button>
          <button class="button is-danger is-small is-light" v-if="(isAdmin || isPublisher) && !(topic._id.indexOf('HOME') === 0)" color="error" @click="remove"><span class="icon"><i class="mdi mdi-18px mdi-trash-can-outline"></i></span></button>
        </div>
      </h1>
      <span v-for="(tag, index) in topic.tag" :key="index" class="tag is-info is-light" style="margin: 5px 2px;">{{ tag }}</span>
      <hr>
      <markdown class="m-2" :content="topic.content"></markdown>
    </div>
    <div v-if="SS.token">
      <button class="button is-primary mb-2 ml-4" v-if="topic" @click="show = !show">
        {{ show ? '收起' : '添加回复' }}
        <span class="icon ml-1" :class="show ? 'mdi mdi-18px mdi-chevron-up' : 'mdi mdi-18px mdi-chevron-down'"></span>
      </button>
      <comment-editor class="mb-2 ml-4" v-if="topic && show" :anonymous="topic.anonymous" />
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
import CommentEditor from '../components/CommentEditor.vue'
import { SS, topic } from '../plugins/state.js'
import { getTopic, token } from '../plugins/action.js'

const route = useRoute(), router = useRouter()
const tzoffset = (new Date()).getTimezoneOffset() * 60000

ref: loading = false
ref: isAdmin = SS.role === 'ADMIN'
ref: isPublisher = false
ref: show = false
ref: searchbar = false
ref: keyword = ''
ref: result = []

if (topic.publisher = SS.id) isPublisher = true
getTopic(route.params.id)

const commentList = computed(() => {
  if (!keyword.value) return topic.value.comments
  const reg = new RegExp(keyword.value, 'i')
  return topic.value.comments.filter(x => reg.test(x.content) || reg.test(x.publisher))
})

function parseDate (timestamp) {
  if (!timestamp || typeof (timestamp) === 'undefined') return
  const s = new Date(timestamp - tzoffset).toISOString().split('T')
  const date = s[0]
  const time = s[1].substr(0, 8)
  return date + ' ' + time
}

function edit () {
  if (isAdmin) showPublish++
  else router.push('/edit')
}

console.log(typeof token())
async function remove () {
  const r = await Swal.fire({
    title: '你确定要删除吗？',
    text: "此操作不可以撤销",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
  if (!r.isConfirmed) return

  loading = true
  axios.delete(`/api/${SS.channel}/${route.params.id}`,  token())
    .then(res => {
      Swal.fire('成功', res.data, 'success')
        .then(() => { router.push('/home/' + SS.channel) })
    })
    .catch(err => { window.Swal.fire('错误', err.response ? err.response.data : '网络错误', 'error') })
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