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
    children: [
      {
        path: "",
        name: "Tweat",
        component: Tweat,
      },
      {
        path: ":username/tweat/:id",
        name: "TweatDetail",
        component: TweatDetail,
      }
    ],
  },
  {
    path: "/:username",
    name: "UserProfile.index",
    component: UserProfile,
    children: [
      {
        path: "",
        name: "UserProfile",
        component: UserTweat,
      },
      {
        path: "medias",
        name: "UserMedia",
        component: UserMedia,
      },
      {
        path: "likes",
        name: "UserLikes",
        component: UserLikes,
      },
      {
        path: "replies",
        name: "UserReplies",
        component: UserReplies,
      }
    ]
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
