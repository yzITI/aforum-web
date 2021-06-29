<template>
  <div class="mainclass">
    <button class="button is-primary" style="position: fixed; bottom: 5vh; right: 5vh; z-index: 100; border-radius: 888px; width: 4rem; height: 4rem" @click="router.push('/edit'); topic = null">
      <span class="icon">
        <i class="mdi mdi-24px mdi-pencil" />
      </span>
    </button>
    <list></list>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import List from '../components/List.vue'
import { getList } from '../plugins/action.js'
const router = useRouter()
getList()
</script>

<style scoped>
.mainclass {
  height: 100%;
}
</style>