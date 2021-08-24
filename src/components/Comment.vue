<template>
  <div class="box">
    <div class="is-5 m-0 pb-0">
      {{ comment.author }} &nbsp; {{ parseDate }} &nbsp;
      <span class="icon" @click="remove" v-if="comment.permission === 2">
        <i class="mdi mdi-18px mdi-trash-can-outline" style="color: red; cursor: pointer;" />
      </span>
    </div>
    <div class="m-0 pt-0 pb-0" style="width:100%; color: black"><markdown :content="comment.content" /></div>
  </div>
</template>

<script setup>
import Markdown from './Markdown.vue'
import { defineProps } from 'vue'
import { useRoute } from 'vue-router'
import { deleteComment, getComments } from '../plugins/action.js'

const tzoffset = (new Date()).getTimezoneOffset() * 60000
const { comment } = defineProps(['comment'])
const route = useRoute()

async function remove () {
  const r = await Swal.fire({
    title: '你确定要删除吗？',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
  if (!r.isConfirmed) return
  await deleteComment(comment._id)
  getComments(route.params.id)
}

const parseDate = $computed(() => {
  const timestamp = comment.timestamp
  if (!timestamp || typeof (timestamp) === 'undefined') return
  const s = new Date(timestamp - tzoffset).toISOString().split('T')
  const date = s[0]
  const time = s[1].substr(0, 8)
  return date + ' ' + time
})
</script>