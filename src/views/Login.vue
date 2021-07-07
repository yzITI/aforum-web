<template>
  <div class="login">
    <h1 style="margin-bottom: 50px; font-size: 3rem;">{{ SS.channel }}</h1>
    <h2>{{ notice }}</h2>
  </div>
</template>
<script setup>
import { SS } from '../plugins/state.js'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute(), router = useRouter()
ref: notice = '正在登录...'
const code = route.query.code

if (!code) {
  notice = '跑错啦！'
  setTimeout(() => { router.push('/') }, 3000)
}

axios.post(`/api/`, { code })
  .then(resp => {
    SS.token = resp.data.token
    SS.id = resp.data.id
    SS.role = resp.data.role
    notice = '登录成功，正在跳转...'
    if (SS.channel) setTimeout(() => { router.push(`/home/${SS.channel}`) }, 1000)
  })
  .catch(err => {
    notice = err.response ? err.response.data : '网络错误'
  })
  .finally(() => {
    setTimeout(() => { router.push('/') }, 3000)
  })

</script>

<style scoped>
div.login {
  color: #333;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
