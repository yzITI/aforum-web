<template>
  <div class="admin pt-4">
    <div class="box m-4" v-for="u in users">
      <h1 class="title is-4 m-0">
        {{ u.name }}
        <span class="icon m-1" @click="disable(u)" style="cursor: pointer;">
          <i class="mdi mdi-24px mdi-account-cancel" :style="u.enable ? 'color: grey' : 'color: red'"/>
        </span>
        <span class="icon m-1" @click="able(u)" style="cursor: pointer;">
          <i class="mdi mdi-24px mdi-account-check" :style="u.enable ? 'color: #4F97D6' : 'color: grey'"/>
        </span>
        <span class="icon m-1" @click="deleteUser(u)" style="cursor: pointer;">
          <i class="mdi mdi-24px mdi-trash-can-outline" style="color: red;" />
        </span>
      </h1>
      <p class="is-5">{{ u.role }} &nbsp; <code>{{ u.group }}</code></p>
    </div>
  </div>
</template>

<script setup>
import { token } from '../plugins/action.js'
ref: users = []
ref: loading = true
getUser()

function able (u) {
  if (u.enable == true) return
  u.enable = true
  putUser(u)
}

function disable (u) {
  if (u.enable == false) return
  u.enable = false
  putUser(u)
}

async function getUser () {
  loading = true
  await axios.get('/api/user', token())
    .then(res => {
      users = res.data
      users.sort((a, b) => b.enable && !a.enable)
    })
    .catch(err => { window.Swal.fire('错误', err.response ? err.response.data : '网络错误', 'error') })
  loading = false
}

async function putUser (u) {
  loading = true
  await axios.put('/api/user/' + u._id, { enable: u.enable }, token())
    .then(res => { window.Swal.fire('成功', res.data, 'success') })
    .catch(err => { window.Swal.fire('错误', err.response ? err.response.data : '网络错误', 'error') })
  loading = false
}

async function deleteUser (u) {
  loading = true
  const r = await Swal.fire({
    title: '你确定要删除吗？',
    text: "此操作不可以撤销",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
  if (!r.isConfirmed) return

  await axios.delete('/api/user/' + u._id, token())
    .then(res => { window.Swal.fire('成功', res.data, 'success') })
    .catch(err => { window.Swal.fire('错误', err.response ? err.response.data : '网络错误', 'error') })
  getUser()
  loading = false
}
</script>

<style scoped>
div.admin {
  min-height: 93vh;
  background: #eee;
}
</style>