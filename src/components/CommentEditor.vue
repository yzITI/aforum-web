<template>
  <div class="box">
    <textarea class="textarea" v-model="comment" placeholder="添加回复"></textarea>
    <button class="button is-info" @click="markdown = true">点击预览</button>
    <button class="button is-primary" @click="post">提交</button>
    <label class="checkbox"><input type="checkbox" v-model="anonymousComment">匿名评论</label>
    <span class="icon" @click="uploadImage = true">
      <i class="mdi mdi-24px mdi-camera"></i>
    </span>
  </div>
  <div class="modal" :class="{ 'is-active': uploadImage }">
    <div class="modal-background" @click="uploadImage = false"></div>
    <div class="modal-content">
      <div class="box">
        <div class="file has-name">
          <label class="file-label">
            <input class="file-input" type="file" @change="uploadfile">
            <span class="file-cta">
              <span class="file-icon">
                <i class="fas fa-upload"></i>
              </span>
              <span class="file-label">
                Choose a file…
              </span>
            </span>
            <span class="file-name">
              {{ file && file.name }}
            </span>
          </label>
          <button class="button is-info" :class="{ 'is-loading': imgLoading }" @click="upload" style="margin-left: 8px;">上传</button>
        </div>
        <div class="box" style="margin-top: 24px;" v-if="imgStr" @click="copy">
          <p class="title is-5">点击复制</p>
          <p class="title is-6">{{ imgStr }}</p>
          <input type="hidden" id="imgStr" :value="imgStr">
        </div>
      </div>
    </div>
  </div>
  <div class="modal" :class="{ 'is-active': markdown }">
    <div class="modal-background" @click="markdown = false"></div>
    <div class="modal-content">
      <div class="box">
        <markdown :content="comment"></markdown>
      </div>
    </div>
  </div>
</template>

<script setup>
import Markdown from './Markdown.vue'
import { useRoute } from 'vue-router'
import { SS, postComment, getComment } from '../plugins/state.js'
const route = useRoute()
ref: anonymousComment = false
ref: comment = ''
ref: markdown = false
ref: uploadImage = false
ref: file = null
ref: imgStr = ''
ref: imgLoading = false
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