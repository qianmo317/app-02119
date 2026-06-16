import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomePage.vue'),
    meta: { title: '首页' }
  },
  {
    path: '/spots',
    name: 'SpotList',
    component: () => import('@/views/SpotListPage.vue'),
    meta: { title: '景点列表' }
  },
  {
    path: '/spot/:id',
    name: 'SpotDetail',
    component: () => import('@/views/SpotDetailPage.vue'),
    meta: { title: '景点详情' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

router.beforeEach((to) => {
  document.title = `${to.meta.title} - 周末江门市打卡点`
})

export default router
