import { createRouter, createWebHistory } from 'vue-router'
import { pb } from '@/pocketbase';
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue')
    },
    {
      path: '/absent',
      name: 'absent',
      component: () => import('@/views/absent/IndexView.vue')
    },
    {
      path: '/schedule',
      name: 'schedule',
      component: () => import('@/views/ScheduleView.vue')
    },
  ]
});

router.beforeEach((to) => {
  if (!pb.authStore.token && to.name !== 'login')
    return ({ name: 'login' });
  else if (pb.authStore.token && to.name === 'login')
    return ({ name: 'home' });
});

export default router
