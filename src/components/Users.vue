<template>
  <div class="modal is-active" v-if="modal">
    <div class="modal-background" @click="modal = false" />
    <div class="header m-1">
      <input class="input is-normal" v-model="keyword" placeholder="搜索" />
    </div>
    <div class="modal-content">
      <div class="user-list" style="background-color: white;">
        <h1 class="title is-5">成员(*为管理员)</h1>
        <div v-for="u in users" :key="u._id">
          <div class="user-info p-1" v-if="channel.members.indexOf(u._id) != -1">
            <span class="icon">
              <i class="mdi mdi-18px mdi-trash-can-outline" @click="remove(u._id)"/>
            </span>
            <span class="icon">
              <i class="mdi mdi-18px mdi-account-star-outline" @click="addAdmin(u._id)"/>
            </span>
            <div class="is-6">{{ u.name }}</div>
            <code>{{ u.group }}</code>
          </div>
          <div class="user-info p-1" v-if="channel.admins.indexOf(u._id) != -1">
            <span class="icon">
              <i class="mdi mdi-18px mdi-trash-can-outline" @click="remove(u._id)"/>
            </span>
            <span class="icon">
              <i class="mdi mdi-18px mdi-account-minus-outline" @click="removeAdmin(u._id)"/>
            </span>
            <div class="is-6">{{ u.name }}*</div>
            <code>{{ u.group }}</code>
          </div>
        </div>
      </div>
      <div class="user-list">
        <h1 class="title is-5">其他用户</h1>
        <div v-for="u in users" :key="u._id">
          <div class="user-info p-1" v-if="channel.members.indexOf(u._id) == -1 && channel.admins.indexOf(u._id) == -1">
            <span class="icon">
              <i class="mdi mdi-18px mdi-account-plus-outline" @click="add(u._id)"/>
            </span>
            <div class="is-6">{{ u.name }}</div>
            <code>{{ u.group }}</code>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { token, popError} from '../plugins/action.js'
import { channel } from '../plugins/state.js'
let modal = $ref(true)
let all = $ref([])
let loading = $ref(false)
let keyword = $ref('')

axios.get('/api/general/users?channel=' + channel.value._id, token())
  .then(res => {
    all = res.data
  })
  .catch(popError)

const users = $computed(() => {
  const res = []
  if (keyword) {
    for (const u of all) {
      const reg = new RegExp(keyword, 'i')
      let pass = false
      if (reg.test(u.name)) pass = true
      if (reg.test(u.group)) pass = true
      if (pass) res.push(u)
    }
    res.sort((a, b) => (channel.value.admins.indexOf(b._id)))
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

async function addAdmin (id) {
  channel.value.members.splice(channel.value.members.indexOf(id))
  channel.value.admins.push(id)
}

async function removeAdmin (id) {
  channel.value.admins.splice(channel.value.members.indexOf(id))
  channel.value.members.push(id)
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
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 960px;
  width: 95vw;
  border-radius: 0;
}
.icon {
  cursor: pointer;
}
.admin-tag {
  color: grey;
}
.user-info {
  display: flex;
}
@media (max-width: 560px) {
  .modal-content {
    flex-direction: column;
  }
}
</style>