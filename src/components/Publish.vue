<template>
  <div class="modal" :class="{ 'is-active': modal }">
    <div class="modal-background" @click="modal = false"></div>
    <div class="modal-content" style="width: auto;">
      <div class="box">
        <template v-if="isAdmin">
          <label class="checkbox"><input type="checkbox" v-model="setting.pin">置顶讨论</label>
          <label class="checkbox"><input type="checkbox" v-model="setting.hide">隐藏讨论</label>
          <label class="checkbox"><input type="checkbox" v-model="setting.restrict">评论互不可见</label>
          <label class="checkbox"><input type="checkbox" v-model="setting.public">公开到首页</label>
        </template>
        <label class="checkbox"><input type="checkbox" v-model="setting.public">公开到首页</label>
        <span class="tag" v-for="t in setting.tag">{{ t }}</span>
        <input class="input" v-modal="tag" @keydown.enter="add">
        <button v-if="isAdmin && topic && !draft" class="button is-info" @click="router.push('/edit')">修改内容</button>
        <button class="button is-primary" :class="{ 'is-loading': loading }" @click="submit">发布</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { topic, draft, SS, postTopic, putTopic } from '../plugins/state.js'
const props = defineProps(['random'])
const router = useRouter()

ref: loading = false
ref: modal = false
ref: isAdmin = SS.role === 'ADMIN'
ref: setting = {
  anonymous: false,
  public: false,
  pin: false,
  hide: false,
  restrict: false,
  tag: []
}
ref: tag = ''
ref: title = computed(() => {
  if (topic.value && !isAdmin) return '确认修改？'
  return '发布设置'
})

function add () {
  console.log(tag)
  if (!tag.length) return
  setting.tag.push(tag)
  tag = ''
}

function random (v) {
  modal = Boolean(v)
  loading = false
  if (topic.value) {
    setting = {
      anonymous: topic.value.anonymous,
      public: topic.value.public,
      pin: topic.value.pin,
      hide: topic.value.hide,
      restrict: topic.value.restrict,
      tag: topic.value.tag
    }
  }
}

watch(() => props.random, () => random(props.random))

async function submit () {
  loading = true
  console.log(setting.tag)
  draft.value = { ...draft.value, ...setting }
  const res = topic.value ? await putTopic() : await postTopic()
  if (res) {
    modal = false
    window.Swal.fire('成功', res.data, 'success')
      .then(res => {
        if (topic.value) router.push(`/topic/${topic.value._id}?` + Math.random())
        else router.push('/main')
      })
  }
  loading = false
}
</script>