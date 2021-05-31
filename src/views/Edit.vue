<template>
  <input class="input is-normal" placeholder="标题" v-model="title" style="height: 40px;">
  <span class="icon" style="position: absolute; width: 40px; height: 40px; right: 0;" @click="modal = true">
    <i class="mdi mdi-24px mdi-camera"></i>
  </span>
  <div class="modal" :class="{ 'is-active': modal }">
    <div class="modal-background" @click="modal = false"></div>
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
  <div style="height: 100%; width: 100%; margin: 0; padding: 0; display: inline-flex;">
    <textarea label="输入框" rows="20" style="width: 50%; background-color: #EEEEEE; padding: 10px 20px; border: 0;" v-model="content"/>
    <markdown class="md-body" :content="content"></markdown>
  </div>
  <button class="button is-primary" :class="{ 'is-loading': loading }" :disabled="!title" style="position: absolute; bottom: 10vh; right: 10vw; z-index: 100; border-radius: 1024px; width: 4rem; height: 4rem;" @click="publishdraft">
    <span class="icon">
      <i class="mdi mdi-24px mdi-check"></i>
    </span>
  </button>
  <publish :random="showSetting" style="z-index: 101;"/>
</template>

<script setup>
import Markdown from '../components/Markdown.vue'
import Publish from '../components/Publish.vue'
import Template from '../template.js'
import { topic, SS, draft } from '../plugins/state.js'
import { useRouter } from 'vue-router'
const router = useRouter()
ref: wide = false
ref: content = Template
ref: title = ''
ref: loading = false
ref: modal = false
ref: file = null
ref: imgStr = ''
ref: imgLoading = false
ref: showSetting = 0

if (!SS.token) router.push('/')
if (topic.value) {
  title = topic.value.title
  content = topic.value.content
}
draft.value = null

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

function publishdraft () {
  draft.value = { title, content }
  showSetting++
}

</script>

<style scoped>
.md-body {
  overflow-wrap: break-word;
  word-wrap: break-word;
  overflow-y: scroll;
  width: 50%;
  padding: 10px 20px;
  border-radius: 5px;
  max-height: 90vh;
}
</style>