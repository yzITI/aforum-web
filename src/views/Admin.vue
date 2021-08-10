<template>
  <div class="admin pt-4">
    <p v-if="loading">Loading...</p>
    <div class="box" style="max-width: 80vw; margin: 0 auto;" v-else>
      <label class="label is-flex">
        _id：
        <input class="input is-small ml-3" v-model="channel._id" :disabled="!isRoot" type="text">
      </label>
      <label class="label is-flex">
        名称:
        <input class="input is-small ml-3" v-model="channel.name" :disabled="!isRoot" type="text">
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
      <label class="label is-flex">
        背景图片链接:
        <input class="input is-small ml-3" v-model="channel.bg" type="text">
      </label>
      <label class="label is-flex">
        成员:
        <input class="input is-small ml-3" v-model="memberString" type="text">
      </label>
      <label class="label is-flex">
        管理员:
        <input class="input is-small ml-3" v-model="adminString" type="text">
      </label>
      <hr>
      <div class="buttons">
        <button class="button is-primary" :class="{ 'is-loading': loading }" @click="submit">提交信息</button>
        <button class="button is-danger" v-if="isRoot" :class="{ 'is-loading': loading }" @click="remove">删除频道</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { token, popError } from '../plugins/action.js'
import { SS, channel } from '../plugins/state.js'
const route = useRoute()
ref: loading = true
ref: isRoot = SS.id === '3y14J0Utxk'

ref: memberString = ''
ref: adminString = ''

axios.get('/api/channel/admin/' + route.params.id, token())
  .then(res => {
    channel.value = res.data
    memberString = channel.value.members.join()
    adminString = channel.value.admins.join()
  })
  .catch(popError)
  .finally(() => { loading = false })

async function submit () {
  loading = true
  channel.value.members = memberString.split(',').filter(x => x.length)
  channel.value.admins = adminString.split(',').filter(x => x.length)
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
label.label {
  justify-content: space-between;
}
input.input {
  max-width: 80%;
}
</style>