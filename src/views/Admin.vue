<template>
  <div class="admin pt-4">
    <p v-if="loading">Loading...</p>
    <div class="box" style="max-width: 80vw; margin: 0 auto;" v-else>
      <label class="label">
        _id：
        <input class="input is-small mt-1" v-model="channel._id" :disabled="!isRoot" type="text">
      </label>
      <label class="label">
        名称:
        <input class="input is-small mt-1" v-model="channel.name" :disabled="!isRoot" type="text">
      </label>
      <label class="checkbox is-block m-2">
        <input class="checkbox is-small mr-3" v-model="channel.public" :disabled="!isRoot" type="checkbox">
        登录用户自动成为成员
      </label>
      <label class="checkbox is-block m-2">
        <input class="checkbox is-small mr-3" v-model="channel.hide" :disabled="!isRoot" type="checkbox">
        仅成员可见
      </label>
      <label class="checkbox is-block m-2">
        <input class="checkbox is-small mr-3" v-model="channel.anonymous" :disabled="!isRoot" type="checkbox">
        允许匿名
      </label>
      <hr>
      <label class="label">
        背景图片链接:
        <input class="input is-small mt-1" v-model="channel.bg" type="text">
      </label>
      <button class="button is-normal mt-2" @click="showUsers++">成员管理</button>
      <hr>
      <div class="buttons">
        <button class="button is-primary" :class="{ 'is-loading': loading }" @click="submit">提交信息</button>
        <button class="button is-danger" v-if="isRoot" :class="{ 'is-loading': loading }" @click="remove">删除频道</button>
      </div>
    </div>
    <users v-if="showUsers" :key="showUsers" />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { token, popError } from '../plugins/action.js'
import { SS, channel } from '../plugins/state.js'
import Users from '../components/Users.vue'
const route = useRoute()
let loading = $ref(true)
let isRoot = $ref(SS.id === '3y14J0Utxk')
let showUsers = $ref(0)

axios.get('/api/channel/admin/' + route.params.id, token())
  .then(res => {
    channel.value = res.data
  })
  .catch(popError)
  .finally(() => { loading = false })

async function submit () {
  loading = true
  const res = await axios.put('/api/channel/' + channel.value._id, channel.value, token())
    .then(res => res.data)
    .catch(popError)
  if (res) Swal.fire('提交成功', res, 'success')
  loading = false
}

async function remove () {
  const r = await Swal.fire({
    title: '你确定要删除频道吗？',
    text: '所有讨论和回复也会被删除',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
  if (!r.isConfirmed) return
  loading = true
  const res = await axios.delete('/api/channel/' + channel.value._id, token())
    .then(res => res.data)
    .catch(popError)
  if (res) {
    Swal.fire('提交成功', res, 'success')
    router.push('/')
  }
  loading = false
}
</script>

<style scoped>
div.admin {
  min-height: 93vh;
  background: #eee;
}
</style>