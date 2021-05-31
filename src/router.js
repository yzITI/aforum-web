import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: '数学在线讨论',
    component: () => import('./views/Home.vue')
  },
  {
    path: '/main',
    name: '主页',
    component: () => import('./views/Main.vue')
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
  }
]

const router = createRouter({ history: createWebHashHistory(), routes }) 

router.afterEach(() => {
  Swal.close()
})

export default router