<template>
  <div class="admin">
    <loading :loading="loading"></loading>
    <div class="box" style="margin: 1vh 8vw;" v-for="u in users">
      <div class="title is-4" style="margin-left: 10px;">{{ u.name }}
        <div class="title is-5">{{ u.role }} &nbsp; {{ u.group }}</div>
        <button class="button is-danger" style="margin: 0 20px;" @click="deleteUser(u)">
          <span class="icon">
            <i class="mdi mdi-24px mdi-delete"></i>
          </span>
        </button>
        <v-switch v-model="u.enable" @change="putUser(u)"></v-switch>
      </div>
    </div>
  </div>
</template>

<script setup>
import { token } from '../plugins/state.js'
const opt = { headers: { token: token() } }
ref: users = []
ref: loading = true
getUser()

async function getUser () {
  loading = true
  await axios.get('/api/user', opt)
    .then(res => {
      users = res.data
      users.sort((a, b) => b.enable && !a.enable)
    })
    .catch(err => { window.Swal.fire('错误', err.response ? err.response.data : '网络错误', 'error') })
  loading = false
}
async function putUser (u) {
  loading = true
  await axios.put('/api/user/' + u._id, { enable: u.enable }, opt)
    .then(res => { window.Swal.fire('成功', res.data, 'success') })
    .catch(err => { window.Swal.fire('错误', err.response ? err.response.data : '网络错误', 'error') })
  loading = false
}
async function deleteUser (u) {
  loading = true
  await axios.delete('/api/user/' + u._id, opt)
    .then(res => { window.Swal.fire('成功', res.data, 'success') })
    .catch(err => { window.Swal.fire('错误', err.response ? err.response.data : '网络错误', 'error') })
  getUser()
  loading = false
}
</script>

<style scoped>
div.admin {
  min-height: 100vh;
  padding-top: 80px;
  background: #eee;
}
</style>