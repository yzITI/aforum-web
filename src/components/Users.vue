<template>
  <div class="modal is-active" v-if="modal">
    <div class="modal-background" @click="modal = false" />
    <div class="modal-content">
      <div class="user-list">
        <h1>{{ channel.name }}成员</h1>
        <div v-for="u in users">
          <div class="box p-2 m-2" v-if="channel.members.indexOf(u._id) != -1">
            <div>
              <div class="title is-5 m-1">{{ u.name }}</div>
              <code>{{ u.group }}</code>
            </div>
            <span class="icon">
              <i class="mdi mdi-18px mdi-trash-can-outline" @click="remove(u._id)"/>
            </span>
          </div>
        </div>
      </div>
      <div class="user-list">
        <h1>其他用户</h1>
        <div v-for="u in users">
          <div class="box p-2 m-2" v-if="channel.members.indexOf(u._id) == -1">
            <div>
              <div class="title is-5 m-1">{{ u.name }}</div>
              <code>{{ u.group }}</code>
            </div>
            <span class="icon">
              <i class="mdi mdi-18px mdi-account-plus-outline" @click="add(u._id)"/>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="button is-primary" :class="{ 'is-loading': loading }" @click="submit">提交修改</div>
      <input class="input is-normal" v-model="keyword" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { token, popError, putChannel } from '../plugins/action.js'
import { channel, keyword } from '../plugins/state.js'
ref: modal = true
ref: all = []
ref: loading = false

axios.get('/api/general/users?channel=' + channel.value._id, token())
  .then(res => {
    all = res.data
  })
  .catch(popError)

const users = computed(() => {
  const res = []
  if (keyword.value) {
    for (const u of all) {
      const reg = new RegExp(keyword.value, 'i')
      let pass = false
      if (reg.test(u.name)) pass = true
      if (reg.test(u.group)) pass = true
      if (pass) res.push(u)
    }
    return res
  }
  return all
})

async function remove (id) {
  channel.value.members.splice(channel.value.members.indexOf(id))
}

async function add (id) {
  channel.value.members.push(id)
}

async function submit () {
  loading = true
  const res = await putChannel(channel.value._id)
  if (res) window.Swal.fire('成功', res, 'success')
  loading = false
}

</script>

<style scoped>
.modal-content {
  display: flex;
  padding: 0;
  width: 95vw;
  max-width: 960px;
}
.user-list {
  height: 65vh;
  min-width: 50%;
  overflow-y: auto;
  background-color: #eee;
  padding: 10px 20px;
  border: 0;
  flex-grow: 1;
  resize: none;
}
.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.icon {
  cursor: pointer;
}
</style>