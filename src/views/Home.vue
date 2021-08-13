<template>
  <banner bg="/bg.jpg" title="在线讨论平台" logo="logo">
    <button class="button is-primary" v-if="!SS.token" @click="login">点击登录</button>
  </banner>
  <div class="notification is-info is-light mt-4" v-if="!SS.token"
    @click="login"
    style="width: 90%; max-width: 450px; margin: 0 auto; cursor: pointer;">
    您还没有登录，点击此处可以登录查看更多精彩内容！
  </div>
  <div class="p-4 m-4" style="display: flex; flex-wrap: wrap; justify-content: center;">
    <p v-if="loading">正在加载频道资源...</p>
    <p v-if="!loading && channels.length === 0">暂无频道资源</p>
    <channel-card v-for="c in channels" :key="c._id" :info="c" style="cursor: pointer;"/>
  </div>
</template>

<script setup>
import Banner from '../components/Banner.vue'
import ChannelCard from '../components/ChannelCard.vue'
import { token, popError } from '../plugins/action.js'
import { SS, editor, channel } from '../plugins/state.js'

// clean
editor.value = null
channel.value = null

ref: channels = []
ref: loading = true
axios.get('/api/general/channels', token())
  .then(res => { channels = res.data })
  .catch(err => {
    Swal.fire('错误', err.response ? err.response.data : '网络错误', 'error')
  })
  .finally(() => loading = false)

function login () {
  window.location.href = 'https://cn.aauth.link/#/launch/o0Y5hrvbMd'
}
</script>

