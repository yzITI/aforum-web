<template>
  <div class="box pb-2 ml-4 mr-4">
    <textarea class="textarea" v-model="comment" placeholder="添加回复" />
    <label class="checkbox mr-2 mt-2 mb-2 is-4"><input class="mr-1" type="checkbox" v-model="anonymousComment">匿名评论</label>
    <label @click="showFile++">
      <span class="icon mt-2" ><i class="mdi mdi-18px mdi-camera" /></span>
      <span class="mt-2 is-4">上传图片</span>
    </label>
    <div class="buttons">
      <button class="button is-info is-small" @click="preview++" :disabled="!comment">预览</button>
      <button class="button is-primary is-small" @click="post" :disabled="!comment">提交</button>
    </div>
  </div>
  <file :random="showFile" />
  <preview :random="preview" :content="comment" />
</template>

<script setup>
import Markdown from './Markdown.vue'
import File from './File.vue'
import Preview from './Preview.vue'
import { useRoute } from 'vue-router'
import { SS, postComment, getComment } from '../plugins/state.js'
const route = useRoute()

ref: anonymousComment = false
ref: comment = ''
ref: preview = 0
ref: showFile = 0
ref: loading = false

function uploadfile (f) {
  const files = f.target.files || f.dataTransfer.files
  if (!files.length) return
  file = files[0]
}

function copy () {
  let testingCodeToCopy = document.querySelector('#imgStr')
  testingCodeToCopy.setAttribute('type', 'text')
  testingCodeToCopy.select()

  try {
    const successful = document.execCommand('copy')
    const msg = successful ? 'successful' : 'unsuccessful'
    swal.fire('复制成功', '', 'success')
  } catch (err) {
    swal.fire('复制失败', '', 'error')
  }

  /* unselect the range */
  testingCodeToCopy.setAttribute('type', 'hidden')
  window.getSelection().removeAllRanges()
}

async function upload () {
  imgLoading = true
  const formData = new FormData()
  formData.append('file', file, file.name)
  try {
    const res = await axios.post('http://store.yzzx.org/upload', formData, { headers: { token: SS.id } })
    imgStr = '![](http://store.yzzx.org/file/' + res.data.hash + ')'
  } catch (err) {
    console.log(err)
  }
  imgLoading = false
}

function post () {
  loading = true
  postComment(route.params.id, { content: comment, anonymous: anonymousComment })
  getComment(route.params.id)
  comment = ''
  loading = false
}
</script>