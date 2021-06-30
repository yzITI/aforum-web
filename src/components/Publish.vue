<template>
  <div class="modal is-active" v-if="modal">
    <div class="modal-background" @click="modal = false"></div>
    <div class="modal-content" style="width: 70%;">
      <div class="box">
        标签：<span class="tag mr-1 is-info is-light" v-for="t in setting.tag">{{ t }}</span>
        <input class="input mb-2 mt-2" v-model="tag" @keydown.enter="add" placeholder="输入标签，回车添加">
        <template v-if="isAdmin">
          <label class="checkbox mr-2"><input class="mr-1" type="checkbox" v-model="setting.pin">置顶讨论</label>
          <label class="checkbox mr-2"><input class="mr-1" type="checkbox" v-model="setting.hide">隐藏讨论</label>
          <label class="checkbox mr-2"><input class="mr-1" type="checkbox" v-model="setting.restrict">评论互不可见</label>
          <label class="checkbox mr-2"><input class="mr-1" type="checkbox" v-model="setting.public">公开到首页</label>
        </template>
        <div class="buttons mt-2">
          <button v-if="isAdmin && topic && route.path !== '/edit'" class="button is-info is-small" @click="router.push('/edit');">修改内容</button>
          <button class="button is-primary is-small" :class="{ 'is-loading': loading }" @click="submit">发布</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { topic, draft, SS, channel } from '../plugins/state.js'
import { postTopic, putTopic } from '../plugins/action.js'

const props = defineProps(['random'])
const route = useRoute(), router = useRouter()

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
  if (!tag.length) return
  setting.tag.push(tag)
  tag = ''
}

function random (v) {
  modal = v
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
  draft.value = { ...draft.value, ...setting }
  const res = topic.value ? await putTopic() : await postTopic()
  if (res) {
    modal = false
    window.Swal.fire('成功', res.data, 'success')
      .then(res => {
        if (topic.value) router.push(`/topic/${topic.value._id}?` + Math.random())
        else router.push(`/home/${channel.value._id}`)
      })
  }
  loading = false
  draft.value = { title: '', content: '' }
}
</script>