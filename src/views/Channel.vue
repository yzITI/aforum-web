<template>
  <banner :bg="channel.bg" :title="channel.name">
    <div class="field has-addons">
      <p class="control">
        <button class="button" @click="router.push('/')">
          <span class="icon is-small">
            <i class="mdi mdi-18px mdi-arrow-left"></i>
          </span>
          <span>返回首页</span>
        </button>
      </p>
      <p class="control" v-if="SS.token">
        <button class="button is-primary" @click="router.push('/discuss/' + channel._id)">
          <span class="icon is-small">
            <i class="mdi mdi-18px mdi-arrow-right"></i>
          </span>
          <span>进入频道</span>
        </button>
      </p>
      <p class="control" v-else>
        <button class="button is-primary" @click="login">
          <span class="icon is-small">
            <i class="mdi mdi-18px mdi-arrow-right"></i>
          </span>
          <span>点击登录</span>
        </button>
      </p>
    </div>
  </banner>
  <div>
    <section class="show">
      <markdown :content="content || '管理员很懒，什么都没写。'" />
    </section>
    <section style="background-color: #eee; padding: 5vh 0;">
      <h1 class="title is-3" style="text-align: center;">精品内容</h1>
      <list />
    </section>
  </div>
</template>

<script setup>
import Banner from '../components/Banner.vue'
import List from '../components/List.vue'
import Markdown from '../components/Markdown.vue'

import { useRouter } from 'vue-router'
import { topic, keyword, SS, channel } from '../plugins/state.js'
import { getList } from '../plugins/action.js'

const router = useRouter()
ref: content = ''

getList()
content = ''
topic.value = null
keyword.value = ''

function login () {
  if (!SS.token) window.location.href = 'https://cn.aauth.link/#/launch/o0Y5hrvbMd'
}
</script>

<style scoped>
section {
  position: relative;
  z-index: 10;
  min-height: 40vh;
}
.show {
  background-color: white;
  padding: 8px 8%;
}
</style>