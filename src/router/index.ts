import { createRouter, createWebHistory } from 'vue-router'
import { supabase } from '@/database/supabase'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      meta: {
        isRequireAuth: true
      },
      component: HomeView,
      children: [
        {
          path: 'schedule',
          name: 'schedule',
          meta: {
            isRequireAuth: true
          },
          component: () => import('../views/ScheduleView.vue'),
          children: [
            {
              path: 'cards',
              name: 'cards',
              meta: {
              isRequireAuth: true
              },
              component: () => import('../components/AppScheduleCards/AppScheduleCards.vue'),
            },
            {
              path: 'lists',
              name: 'lists',
              meta: {
              isRequireAuth: true
              },
              component: () => import('../components/AppScheduleLists/AppScheduleLists.vue'),
            }
          ]
        },
        {
          path: 'timesheet',
          name: 'timesheet',
          meta: {
            isRequireAuth: true
          },
          component: () => import('../views/TimesheetView.vue'),
        },
        {
          path: 'graphs/support',
          name: 'support',
          meta: {
            isRequireAuth: true
          },
          component: () => import('../views/graphs/SupportView.vue'),
        },
        {
          path: 'graphs/lectors',
          name: 'lectors',
          meta: {
            isRequireAuth: true
          },
          component: () => import('../views/graphs/LectorsView.vue'),
        },
        {
          path: 'instructions/students',
          name: 'instructions_students',
          meta: {
            isRequireAuth: true
          },
          component: () => import('../views/instructions/StudentsView.vue'),
        },
        {
          path: 'instructions/lectors',
          name: 'instructions_lectors',
          meta: {
            isRequireAuth: true
          },
          component: () => import('../views/instructions/LectorsView.vue'),
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      meta: {
          isRequireAuth: false
        },
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/resetpassword',
      name: 'resetpassword',
      meta: {
          isRequireAuth: true
        },
      component: () => import('../views/ResetPasswordView.vue'),
    },
  ],
})

router.beforeEach(async (to, from) => {
  const local = JSON.parse(localStorage.getItem("sb-ybydluillbwvivnlvgqo-auth-token")!)
  if (local) {
    let user = local.user
    let require = to.matched.some(item => item.meta.isRequireAuth);
    if (user) {                   
      const { data, error } = await supabase.from("profiles").select('*').eq('id', user.id)   //получение роли пользователя (если понадобится в будущем)   
    }
    if(require && !user) {        //если страница требует аутентификации и пользователь НЕ в системе
        return "/login"
    }
    if(!require && user) {        //если страница НЕ требует аутентификации и пользователь в системе
        return "/"
    }
    else {
        return true               //true разрешает любой переход
    }
  } else {
    let { data, error } = await supabase.auth.getUser();
    let user = data.user
    let require = to.matched.some(item => item.meta.isRequireAuth);
    if (user) {                   
      const { data, error } = await supabase.from("profiles").select('*').eq('id', user.id)   //получение роли пользователя (если понадобится в будущем)   
    }
    if(require && !user) {        //если страница требует аутентификации и пользователь НЕ в системе
        return "/login"
    }
    if(!require && user) {        //если страница НЕ требует аутентификации и пользователь в системе
        return "/"
    }
    else {
        return true               //true разрешает любой переход
    }
  } 
})

export default router
