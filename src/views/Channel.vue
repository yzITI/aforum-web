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
      <markdown :content="channel.show || 'Loading...'" />
    </section>
    <section class="public">
      <h1 class="title is-3" style="text-align: center;">精品内容</h1>
      <list />
    </section>
  </div>
</template>

<script setup>
import Banner from '../components/Banner.vue'
import List from '../components/List.vue'
import Markdown from '../components/Markdown.vue'

import { useRouter, useRoute } from 'vue-router'
import { discuss, keyword, SS, channel, list } from '../plugins/state.js'
import { getChannel } from '../plugins/action.js'

const router = useRouter(), route = useRoute()

getChannel(route.params.id)
  .then(res => { if (!res) router.push('/') })

// clean
discuss.value = null
keyword.value = ''
list.value = []

function login () {
  if (!SS.token) window.location.href = 'https://cn.aauth.link/#/launch/o0Y5hrvbMd'
}
</script>

<style scoped>
section {
  position: relative;
  z-index: 10;
  min-height: 38vh;
}
.show {
  background-color: white;
  padding: 8px 8%;
}
.public {
  padding: 5vh 0;
  background: rgb(221,164,255);
  background: linear-gradient(0deg, rgba(221,164,255,1) 0%, rgba(190,216,252,1) 33%, rgba(255,255,255,1) 100%);
}
</style>