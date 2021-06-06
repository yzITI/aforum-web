<template>
  <input class="input is-normal" placeholder="标题" v-model="title" style="height: 5vh;">
  <span class="icon" v-if="!wide" style="position: absolute; width: 40px; height: 5vh; right: 32px;" @click="preview++">
    <i class="mdi mdi-24px mdi-text-box-search" />
  </span>
  <span class="icon" style="position: absolute; width: 40px; height: 5vh; right: 0;" @click="showFile++">
    <i class="mdi mdi-24px mdi-camera" />
  </span>
  <file :random="showFile" />
  <div v-if="wide" class="m-0 p-0" style="height: 90vh; width: 100%; display: inline-flex;">
    <textarea label="输入框" rows="20" style="width: 50%; background-color: #EEEEEE; padding: 10px 20px; border: 0;" v-model="content"/>
    <markdown class="md-body" :content="content"></markdown>
  </div>
  <div v-else>
    <textarea label="输入框" rows="20" style="width: 100%; background-color: #EEEEEE; padding: 10px 20px; border: 0; min-height: 90vh" v-model="content"/>
  </div>
  <button class="button is-primary" :class="{ 'is-loading': loading }" :disabled="!title" style="position: absolute; bottom: 5vh; right: 5vh; z-index: 100; border-radius: 1024px; width: 4rem; height: 4rem;" @click="publishdraft">
    <span class="icon">
      <i class="mdi mdi-24px mdi-check"></i>
    </span>
  </button>
  <publish :random="showSetting" style="z-index: 101;"/>
  <preview :random="preview" :content="content" />
</template>

<script setup>
import Markdown from '../components/Markdown.vue'
import Publish from '../components/Publish.vue'
import Template from '../template.js'
import Preview from '../components/Preview.vue'
import File from '../components/File.vue'
import { topic, SS, draft } from '../plugins/state.js'
import { useRouter } from 'vue-router'

const router = useRouter()

ref: content = Template
ref: title = ''
ref: loading = false
ref: showSetting = 0
ref: preview = 0
ref: showFile = 0
const wide = window.innerWidth > 450

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