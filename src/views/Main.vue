<template>
  <div class="mainclass">
    <button class="button is-primary" style="position: fixed; bottom: 10vh; right: 10vw; z-index: 100; border-radius: 888px; width: 4rem; height: 4rem" @click="router.push('/edit')">
      <span class="icon">
        <i class="mdi mdi-24px mdi-pencil"></i>
      </span>
    </button>
    <list></list>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import List from '../components/List.vue'
import { getList } from '../plugins/state.js'
const router = useRouter()
getList()
</script>

<style scoped>
.mainclass {
  height: 100%;
}
</style>