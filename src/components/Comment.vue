<template>
  <div class="box">
    <div class="is-5 m-0 pb-0">
      {{ name }} &nbsp; {{ parseDate }} &nbsp;
      <span class="icon" @click="deleteComment(comment._id)" v-if="isAdmin || isPublisher || comment._id.indexOf(SS.id) === 0">
        <i class="mdi mdi-18px mdi-trash-can-outline" style="color: red" />
      </span>
    </div>
    <div class="m-0 pt-0 pb-0" style="width:100%; color: black"><markdown :content="comment.content" /></div>
  </div>
</template>

<script setup>
import Markdown from './Markdown.vue'
import { computed, defineProps } from 'vue'
import { useRoute } from 'vue-router'
import { SS, deleteComment } from '../plugins/state.js'

const tzoffset = (new Date()).getTimezoneOffset() * 60000
const props = defineProps(['comment'])
const route = useRoute()

ref: isAdmin = SS.role === 'ADMIN'
ref: isPublisher = false

if (route.params.id.indexOf(SS.id) === 0) isPublisher = true

const name = computed(() => props.comment.anonymous ? '匿名' : props.comment.publisher)
const parseDate = computed(() => {
  const timestamp = props.comment.timestamp
  if (!timestamp || typeof (timestamp) === 'undefined') return
  const s = new Date(timestamp - tzoffset).toISOString().split('T')
  const date = s[0]
  const time = s[1].substr(0, 8)
  return date + ' ' + time
})


</script>