<template>
  <div class="list">
    <discuss-card v-for="n in all" :key="n._id" :info="n" style="cursor: pointer;"/>
    <infinite-loading :identifier="identifier" @infinite="load">
      <div slot="no-more">没有更多啦！</div>
      <div slot="no-results">暂时还没有讨论呢</div>
    </infinite-loading>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import InfiniteLoading from 'vue-infinite-loading'
import { list, keyword, result } from '../plugins/state.js'
import { getList } from '../plugins/action.js'
import DiscussCard from './DiscussCard.vue'

const identifier = useRoute().path

async function load ($state) {
  console.log('Load More')
  $state.complete()
}

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