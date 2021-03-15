import { createRouter, createWebHistory } from 'vue-router'
// views
import Home from '@/views/Home.vue'
import UserProfile from '@/views/UserProfile'
import Signin from '@/views/auth/Signin'
import Settings from '@/views/Settings'
// import Signup from '../views/Signup'
// component
import Tweats from '@/components/tweats/Tweats'
import TweatDetail from '@/components/tweats/TweatDetail'
import UserTweats from '@/components/users/UserTweats'
import UserMedias from '@/components/users/UserMedias'


const routes = [
  {
    path: '/login',
    name: 'Signin',
    component: Signin,
  },
  {
    path: '/',
    name: 'Home.index',
    component: Home,
    meta: {requiredLogin: true},
    children: [
      { // default child router
        path: '',
        name: 'Tweats',
        component: Tweats,
        meta: {requiredLogin: true},
      },
      { // tweat detail
        path: '/:username/status/:id',
        name: 'TweatDetail',
        component: TweatDetail,
      },
    ]
  },
  {
    path: '/:username',
    name: 'UserProfile.index',
    component: UserProfile,
    meta: {requiredLogin: true},
    children: [
      { // default child router
        path: '',
        name: 'UserProfile',
        component: UserTweats,
        meta: {requiredLogin: true},
      },
      {
        path: 'media',
        name: 'UserMedias',
        component: UserMedias,
        meta: {requiredLogin: true},
      }
    ]
  },
  { // settings
    path: '/settings',
    name: 'Settings',
    component: Settings
  }
  // {
  //   path: '/signup',
  //   name: 'Signup',
  //   component: Signup,
  // }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  const isLogin = localStorage.getItem("isLogin")
  // check if the request route or url is required to login
  const rqLogin = to.matched.some(
    record => record.meta.requiredLogin
  )

  // redirect user if user is not logged in
  if (!isLogin && rqLogin) next({name: 'Signin'})
  else next()
})

export default router
