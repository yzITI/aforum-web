import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: '论坛',
    component: () => import('./views/Dashboard.vue')
  },
  {
    path: '/home/:id',
    name: '主页',
    component: () => import('./views/ChannelHome.vue')
  },
  {
    path: '/edit',
    name: '编辑发布',
    component: () => import('./views/Edit.vue')
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
    name: '登陆',
    component: () => import('./views/Login.vue')
  },
  {
    path: '/channel/:id',
    name: '频道',
    component: () => import('./views/ChannelPublic.vue')
  }
]

const router = createRouter({ history: createWebHashHistory(), routes }) 

router.afterEach(() => {
  Swal.close()
})

export default router