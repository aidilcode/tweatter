import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import UserProfile from '../views/UserProfile'
import Admin from '../views/Admin'
import Signin from '../views/Signin'
import Signup from '../views/Signup'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiredLogin: true
    }
  },
  {
    path: '/:username',
    name: "UserProfile",
    component: UserProfile,
    meta: {
      requiredLogin: true
    }
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
    meta: {
      requiredLogin: true
    }
  },
  {
    path: "/login",
    name: "Signin",
    component: Signin,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated')

  const requireLogin = to.matched.some(
    record => record.meta.requiredLogin
  )

  if (requireLogin && !isAuthenticated) next({ name: 'Signin' })
  else next()
})

export default router

