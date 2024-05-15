import { createRouter, createWebHistory } from 'vue-router'
import { start, close } from "@/utils/nprogress";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'index',
      redirect: '/index',
      component: () => import('@/views/layout/DefaultLayout.vue'),
      children: [
        {
          path: '/index',
          name: 'home',
          component: () => import('@/views/home/PortalPage.vue'),
          meta: {
            title: '首页',
            keepAlive: true,
            requireAuth: true,
            breadcrumb: [],
            affix: true,
            activeMenu: '/home',
            icon: 'icon-home',
            order: 1,
            hidden: false,
          }
        },
        {
          path: '/tool',
          name: 'tool',
          component: () => import('@/views/tool/ToolGuide.vue'),
          meta: {
            title: '工具指南',
            keepAlive: true,
            requireAuth: true,
            breadcrumb: [],
            affix: true,
            activeMenu: '/tool',
            icon: 'icon-about',
            order: 2,
            hidden: false,
          }
        },
        {
          path: '/plaza',
          name: 'plaza',
          component: () => import('@/views/plaza/FocusPlaza.vue'),
          meta: {
            title: '聚焦广场',
            keepAlive: true,
            requireAuth: true,
            breadcrumb: [],
            affix: true,
            activeMenu: '/plaza',
            icon: 'icon-about',
            order: 3,
            hidden: false,
            dirty: true,
          }
        },
      ]
    },
    {
      path: '/write',
      name: 'write',
      component: () => import('@/views/blog/BlogEditor.vue'),
      meta: {
        title: '写文章',
        keepAlive: true,
        requireAuth: true,
        breadcrumb: [],
        affix: true,
        activeMenu: '/write',
        icon: 'icon-about',
        order: 2,
        hidden: false,
        dirty: true,
      }
    },
    {
      path: '/published',
      name: 'published',
      component: () => import('@/views/blog/PublishedSucc.vue'),
      meta: {
        title: 'published',
        keepAlive: true,
        requireAuth: true,
        breadcrumb: [],
        affix: true,
        activeMenu: '/published',
        icon: 'icon-about',
        order: 2,
        hidden: false,
        dirty: true,
      }
    },
    {
      path: '/tool/:groupName/:pageName',
      name: 'PageWrapper',
      component: () => import('@/views/tool/wrapper/ToolWrapper.vue')
    },
    {
      path: '/:pathMatch(.*)',
      name: '404',
      component: () => import('@/views/error/NotFound.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  start()
  next()
})

router.afterEach((to, from) => {
  close()
})
export default router
