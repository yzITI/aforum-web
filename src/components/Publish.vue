<template>
  <div class="modal is-active" v-if="modal">
    <div class="modal-background" @click="modal = false"></div>
    <div class="modal-content" style="max-width: 560px;">
      <div class="box">
        <h3 class="title is-4">发布</h3>
        <template v-if="typeof editor.title !== 'undefined'">
          <label class="label">
            讨论标题：
            <input class="input mt-1 is-small" v-model="editor.title" placeholder="输入标题，最多25字符">
          </label>
        </template>
        <template v-if="editor.tag">
          <label class="label">
            标签：
            <span class="tag mr-1 is-info is-light" v-for="t in editor.tag" :key="t">{{ t }}</span>
          </label>
          <input class="input mb-2 is-small" v-model="tag" @keydown.enter="add" placeholder="输入标签，回车添加">
        </template>
        <template v-for="(v, k) in checks">
          <label class="checkbox m-2" v-if="typeof editor[k] !== 'undefined'">
            <input class="mr-1" type="checkbox" v-model="editor[k]">{{ v }}
          </label>
        </template>
        <button class="button is-primary is-block mt-2" :class="{ 'is-loading': loading }" :disabled="typeof editor.title !== 'undefined' && (editor.title.length > 25 || !editor.title.match(/\S/))" @click="submit">确认发布</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { discuss, SS, channel, editor } from '../plugins/state.js'
import { publishDiscuss, putComment, getDiscuss, getComments, getList } from '../plugins/action.js'
const route = useRoute(), router = useRouter()

ref: loading = false
ref: modal = true
ref: tag = ''
const checks = {
  author: '匿名发布',
  anonymous: '允许匿名评论',
  public: '公开到首页',
  pin: '置顶讨论',
  hide: '隐藏讨论',
  restrict: '评论互不可见'
}

function add () {
  if (!tag.length) return
  editor.value.tag.push(tag)
  tag = ''
}

function refresh () {
  const id = route.params.id
  if (route.name == '讨论') {
    if (editor.value.title) getDiscuss(id)
    else getComments(id)
  }
  if (route.name == 'channel') getList(id)
}

async function submit () {
  loading = true
  const res = editor.value.title ? await publishDiscuss() : await putComment()
  if (res) {
    modal = false
    window.Swal.fire('成功', res, 'success')
    refresh()
  }
  loading = false
  editor.value = null
}
</script>