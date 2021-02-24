import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'
import { users } from "../assets/users";

import Home from '../views/Home.vue'
import UserProfile from '../views/UserProfile'
import Admin from '../views/Admin'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/:username',
    name: "UserProfile",
    component: UserProfile
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
    meta: {
      requiresAdminPerm: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  const user = store.state.User.user;

  if (!user) {
    await store.dispatch('User/setUser', users[0])
  }

  const isAdmin = false;
  const requireAdminPerm = to.matched.some(
    record => record.meta.requiresAdminPerm
  )

  if (requireAdminPerm && !isAdmin) next({ name: 'Home' })
  else next()
})

export default router
