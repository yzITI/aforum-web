import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('./views/Home.vue')
  },
  {
    path: '/list/:id',
    name: 'channel',
    component: () => import('./views/List.vue')
  },
  {
    path: '/discuss/:id',
    name: '讨论',
    component: () => import('./views/Discuss.vue')
  },
  {
    path: '/login',
    name: '登录',
    component: () => import('./views/Login.vue')
  },
  {
    path: '/channel/:id',
    component: () => import('./views/Channel.vue')
  },
  {
    path: '/admin/:id',
    name: '管理 - channel',
    component: () => import('./views/Admin.vue')
  }
]

const router = createRouter({ history: createWebHashHistory(), routes }) 
router.afterEach(() => {
  Swal.close()
})

export default router