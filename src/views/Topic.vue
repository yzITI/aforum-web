<template>
  <div class="d-flex flex-column" style="background-color: #EEEEEE; height: 100%; padding-top: 80px;">
    <publish :random="showPublish"></publish>
    <div class="topic" v-if="topic">
      <div class="title is-4" style="padding: 5px 0px; color: #757575;">
        {{ parseDate(topic.timestamp) }}
        <br>
        {{ topic.publisher }}
      </div>
      <h1>
        {{ topic.title }}
        <button class="button is-info" v-if="isAdmin || isPublisher" @click="edit">
          <span class="icon">
            <i class="mdi mdi-24px mdi-pencil"></i>
          </span>
        </button>
        <button class="button is-danger" v-if="(isAdmin || isPublisher) && !(topic._id.indexOf('HOME') === 0)" color="error" @click="remove">
          <span class="icon">
            <i class="mdi mdi-24px mdi-delete"></i>
          </span>
        </button>
      </h1>
      <div v-for="(tag, index) in topic.tag" :key="index" class="tag" style="margin: 5px 2px;">{{ tag }}</div>
      <markdown :content="topic.content"></markdown>
    </div>
    <button class="button is-normal" v-if="topic" @click="show = !show" style="margin: 0 20px;">
      {{ show ? '收起' : '添加回复' }}
      {{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
    </button>
    <comment-editor v-if="topic && show" :anonymous="topic.anonymous" style="margin: 10px 20px"></comment-editor>
    <div class="comment" v-if="topic && commentList.length">
      <comment style="margin-bottom: 10px;" v-for="c in commentList" :key="c._id" :comment='c' ></comment>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Markdown from '../components/Markdown.vue'
import Publish from '../components/Publish.vue'
import Comment from '../components/Comment.vue'
import CommentEditor from '../components/CommentEditor.vue'
import { SS, getTopic, getComment, topic, comments } from '../plugins/state.js'
const route = useRoute(), router = useRouter
const tzoffset = (new Date()).getTimezoneOffset() * 60000

ref: loading = false
ref: showPublish = 0
ref: isAdmin = SS.role === 'ADMIN'
ref: isPublisher = false
ref: show = false
ref: searchbar = false
ref: keyword = ''
ref: result = []

if (route.params.id.indexOf(SS.id) === 0) isPublisher = true
getTopic(route.params.id)
getComment(route.params.id)

const commentList = computed(() => {
  if (!keyword.value) return comments.value
  const reg = new RegExp(keyword.value, 'i')
  return comments.value.filter(x => reg.test(x.content) || reg.test(x.publisher))
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
async function remove () {
  loading = true
  await axios.delete('/api/topic/' + route.params.id, { headers: { token: SS.token } })
    .then(res => {
      window.Swal.fire('成功', res.data, 'success')
        .then(() => { router.push('/main') })
    })
    .catch(err => { window.Swal.fire('错误', err.response ? err.response.data : '网络错误', 'error') })
  loading = false
}
</script>

<style scoped>
.topic, .comment, .search{
  margin: 10px 20px;
  background-color: white;
  padding: 0 20px 10px 20px;
  border-radius: 10px;
  position: relative;
}
.comment, .search{
  background-color: #EEEEEE;
  padding: 0px;
}
.search {
  margin: 0px 20px;
}
</style>