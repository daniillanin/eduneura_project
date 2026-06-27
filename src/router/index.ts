import { createRouter, createWebHistory } from 'vue-router'
import { useMainStore } from '@/stores/mainStore'
import { supabase } from '@/database/supabase'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      meta: {
        isRequireAuth: true,
        isRequireAdmin: false
      },
      component: HomeView,
      children: [
        {
          path: 'home',
          name: 'home',
          meta: {
            isRequireAuth: true,
            isRequireAdmin: false
          },
          component: () => import('../views/StartView.vue')
        },
        {
          path: 'schedule',
          name: 'schedule',
          meta: {
            isRequireAuth: true,
            isRequireAdmin: false
          },
          component: () => import('../views/ScheduleView.vue'),
          children: [
            {
              path: 'cards',
              name: 'cards',
              meta: {
              isRequireAuth: true,
              isRequireAdmin: false
              },
              component: () => import('../components/AppScheduleCards/AppScheduleCards.vue'),
            },
            {
              path: 'lists',
              name: 'lists',
              meta: {
              isRequireAuth: true,
              isRequireAdmin: false
              },
              component: () => import('../components/AppScheduleLists/AppScheduleLists.vue'),
            }
          ]
        },
        {
          path: 'users',
          name: 'users',
          meta: {
            isRequireAuth: true,
            isRequireAdmin: false
          },
          component: () => import('../views/UsersView.vue')
        },
        {
          path: 'timesheet',
          name: 'timesheet',
          meta: {
            isRequireAuth: true,
            isRequireAdmin: false
          },
          component: () => import('../views/TimesheetView.vue'),
        },
        {
          path: 'graphs/support',
          name: 'support',
          meta: {
            isRequireAuth: true,
            isRequireAdmin: false
          },
          component: () => import('../views/graphs/SupportView.vue'),
        },
        {
          path: 'graphs/lectors',
          name: 'lectors',
          meta: {
            isRequireAuth: true,
            isRequireAdmin: false
          },
          component: () => import('../views/graphs/LectorsView.vue'),
        },
        {
          path: 'instructions/students',
          name: 'instructions_students',
          meta: {
            isRequireAuth: true,
            isRequireAdmin: false
          },
          component: () => import('../views/instructions/StudentsView.vue'),
        },
        {
          path: 'instructions/lectors',
          name: 'instructions_lectors',
          meta: {
            isRequireAuth: true,
            isRequireAdmin: false
          },
          component: () => import('../views/instructions/LectorsView.vue'),
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      meta: {
          isRequireAuth: false,
          isRequireAdmin: false
        },
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/resetpassword',
      name: 'resetpassword',
      meta: {
          isRequireAuth: true,
          isRequireAdmin: false
        },
      component: () => import('../views/ResetPasswordView.vue'),
    },
  ],
})

router.beforeEach(async (to, from) => {
  const store = useMainStore()
  let localUserData = JSON.parse(localStorage.getItem("sb-ybydluillbwvivnlvgqo-auth-token")!)
  let requireAuth = to.matched.some(item => item.meta.isRequireAuth)
  let requireAdmin = to.matched.some(item => item.meta.isRequireAdmin)

  if (!localUserData) { //если в localStorage нет данных пользователя значит сессия не активна и пользователь не авторизован
    if (requireAuth) {    
      return "/login"
    } else {
      return true         
    }
  } else {
    if (!store.currentUserData) { //перезапись store.currentUserData в случае непреднамеренной очистки RAM браузера
      const user = await supabase.from("profiles").select('*').eq('id', localUserData.user.id).single()
      store.currentUserData = user.data
    }
    //логика для авторизованных пользователей
    if (to.name == "login") {
      return { name: from.name }
    }
    if (to.name == "resetpassword") {
      return { name: from.name }
    }
    if (requireAdmin && store.currentUserData?.role === "admin") {
      return true
    } else if (requireAdmin && store.currentUserData?.role !== "admin") {
      return false
    } else {
      return true
    }
  } 
})

export default router