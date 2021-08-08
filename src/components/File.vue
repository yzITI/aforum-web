<template>
  <div class="modal is-active" v-if="modal">
    <div class="modal-background" @click="modal = false" />
    <div class="modal-content" style="max-width: 400px;">
      <div class="box file has-name">
        <label class="file-label">
          <input class="file-input" type="file" @change="uploadfile" accept="image/*">
          <span class="file-cta">
            <span class="file-icon"><i class="mdi mdi-24px mdi-upload" /></span>
            <span class="file-label">选择图片</span>
          </span>
          <span class="file-name" v-if="file">{{ file && file.name }}</span>
        </label>
        <button v-if="file" class="button is-info ml-3" :class="{ 'is-loading': imgLoading }" @click="upload">上传</button>
      </div>
      <div class="box mt-5" v-if="imgStr" @click="copy">
        <p class="title is-5 mb-2">点击复制</p>
        <p class="is-6">{{ imgStr }}</p>
        <input type="hidden" id="imgStr" :value="imgStr">
      </div>
    </div>
  </div>
</template>

<script setup>
import { SS } from '../plugins/state.js'

ref: modal = true
ref: file = null
ref: imgStr = ''
ref: imgLoading = false

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
</script>