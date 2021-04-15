import { createRouter, createWebHistory } from "vue-router";

// views
import Signin from '@/views/Signin'
import Signup from '@/views/Signup'
import Home from "@/views/Home";
import UserProfile from "@/views/UserProfile";

// components
import Tweat from "@/components/tweats/Tweat";
import TweatDetail from "@/components/tweats/TweatDetail";
import UserTweat from "@/components/users/UserTweat";
import UserMedia from "@/components/users/UserMedia";
import UserLikes from "@/components/users/UserLikes";
import UserReplies from "@/components/users/UserReplies";


const routes = [
  {
    path: '/login',
    name: 'Signin',
    component: Signin,
  },
  {
    path: '/join',
    name: 'Signup',
    component: Signup,
  },
  {
    path: "/",
    name: "Home.index",
    component: Home,
    meta: {requiredLogin: true},
    children: [
      {
        path: "",
        name: "Tweat",
        component: Tweat,
        meta: {requiredLogin: true},
      },
      {
        path: ":username/tweat/:id",
        name: "TweatDetail",
        component: TweatDetail,
        meta: {requiredLogin: true},
      }
    ],
  },
  {
    path: "/:username",
    name: "UserProfile.index",
    component: UserProfile,
    meta: {requiredLogin: true},
    children: [
      {
        path: "",
        name: "UserProfile",
        component: UserTweat,
        meta: { reuse: false, requiredLogin: true },
      },
      {
        path: "medias",
        name: "UserMedia",
        component: UserMedia,
        meta: {requiredLogin: true},
      },
      {
        path: "likes",
        name: "UserLikes",
        component: UserLikes,
        meta: {requiredLogin: true},
      },
      {
        path: "replies",
        name: "UserReplies",
        component: UserReplies,
        meta: {requiredLogin: true},
      }
    ]
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

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

export default router;
