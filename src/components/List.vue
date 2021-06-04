<template>
  <div class="list" v-if="list.length">
    <list-item v-for="n in all" :key="n._id" :info="n" />
  </div>
</template>

<script setup>
import { list, keyword, result } from '../plugins/state.js'
import ListItem from './ListItem.vue'
import { computed } from 'vue'

const all = computed(() => {
  const map = []
  const res = []
  for (const n of list.value) {
    if (keyword.value) {
      const reg = new RegExp(keyword.value, 'i')
      let pass = false
      if (reg.test(n.title)) pass = true
      if (reg.test(n.publisher)) pass = true
      if (!pass) continue
    }
    if (!map[n._id]) {
      res.push(n)
      map[n._id] = true
    }
  }
  for (const n of result.value) {
    if (!map[n._id]) {
      res.push(n)
      map[n._id] = true
    }
  }
  res.sort((a, b) => (b.pin - a.pin) || (b.timestamp - a.timestamp))
  return res
})

</script>

<style scoped>
.list {
  margin: 30px 8%;
}
</style>