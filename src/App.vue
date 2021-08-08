<template>
  <bar></bar>
  <editor v-if="editor"></editor>
  <router-view></router-view>
</template>

<script setup>
import Bar from './components/Bar.vue'
import Editor from './components/Editor.vue'
import { editor } from './plugins/state.js'
import { useRoute } from 'vue-router'
const route = useRoute()
</script>
