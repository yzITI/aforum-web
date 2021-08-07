<template>
  <div class="card" v-if="editor && route.name">
    <header class="card-header">
      <p class="card-header-title mr-6">编辑发布</p>
      <div class="card-header-icon">
        <span class="icon" v-if="expand" @click="expand = false">
          <i class="mdi mdi-24px mdi-window-minimize"></i>
        </span>
        <span class="icon" v-else @click="expand = true">
          <i class="mdi mdi-24px mdi-window-maximize"></i>
        </span>
        <span class="icon ml-2" @click="close">
          <i class="mdi mdi-24px mdi-close"></i>
        </span>
      </div>
    </header>
    <template v-if="expand">
    <div class="card-content">
      <textarea v-if="showRaw" rows="20" v-model="editor.content"/>
      <markdown v-if="showPreview" class="md" :content="editor.content"></markdown>
    </div>
    <footer class="card-footer p-2">
      <button class="button is-small is-primary" @click="editor.submit">
        <span class="icon">
          <i class="mdi mdi-18px mdi-check"></i>
        </span>
        <span>提交发布</span>
      </button>
      <div class="card-header-icon p-0 mr-2">
        <span class="icon m-1" v-if="!showRaw" @click="showRaw = true; showPreview = false; checkShow()">
          <i class="mdi mdi-24px mdi-file-code"></i>
        </span>
        <span class="icon m-1" v-if="!showPreview" @click="showPreview = true; showRaw = false; checkShow()">
          <i class="mdi mdi-24px mdi-file-find"></i>
        </span>
        <span class="icon m-1" @click="showFile++">
          <i class="mdi mdi-24px mdi-camera"></i>
        </span>
      </div>
    </footer>
    </template>
  </div>
  <file :random="showFile" />
</template>

<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
import { editor } from '../plugins/state.js'
import Markdown from './Markdown.vue'
import File from './File.vue'

ref: expand = true
ref: showPreview = true
ref: showRaw = true
ref: showFile = 0

function checkShow () {
  if (window.innerWidth < 700) showPreview = !showRaw
  else showPreview = showRaw = true
}
window.onresize = checkShow

async function close () {
  const res = await Swal.fire({
    title: '确认关闭？',
    html: '您的草稿将会被删除',
    icon: 'warning',
    cancelButtonText: '继续编辑',
    showCancelButton: true
  }).then(res => res.isConfirmed)
  if (!res) return
  editor.value = null
}
</script>

<style scoped>
div.card {
  position: fixed;
  z-index: 1;
  bottom: 16px;
  right: 16px;
  background-color: white;
}
.card-header {
  background-color: #333;
  color: white;
}
.card-header-title {
  color: white;
}
.card-content {
  display: flex;
  padding: 0;
  width: 95vw;
  max-width: 960px;
}
textarea {
  height: 65vh;
  min-width: 50%;
  overflow-y: auto;
  background-color: #EEEEEE;
  padding: 10px 20px;
  border: 0;
  flex-grow: 1;
}
.md {
  height: 65vh;
  overflow-y: auto;
  padding: 16px;
  flex-grow: 1;
}
.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>