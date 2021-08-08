import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('./views/Home.vue')
  },
  {
    path: '/home/:id',
    name: '频道',
    component: () => import('./views/ChannelHome.vue')
  },
  {
    path: '/topic/:id',
    name: '讨论',
    component: () => import('./views/Topic.vue')
  },
  {
    path: '/admin',
    name: '管理',
    component: () => import('./views/Admin.vue')
  },
  {
    path: '/login',
    name: '登录',
    component: () => import('./views/Login.vue')
  },
  {
    path: '/channel/:id',
    component: () => import('./views/ChannelPublic.vue')
  }
]

const router = createRouter({ history: createWebHashHistory(), routes }) 

router.afterEach(() => {
  Swal.close()
})

export default router