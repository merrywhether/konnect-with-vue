import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/services',
    },
    {
      path: '/services',
      name: 'services',
      component: () => import('@/views/ServicesView.vue'),
      children: [
        {
          path: ':id',
          name: 'service-detail',
          component: () => import('@/components/service-detail/ServiceDetail.vue'),
          props: true,
        },
      ],
    },
  ],
})

export default router
