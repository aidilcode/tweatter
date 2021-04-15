<template>
  <UserEditProfile
    v-if="state.editProfile"
    :username="state.userRequest.username"
    @cancelEditProfile="cancelEditProfile"
    @updatedUser="updatedUser"
  />
  <div id="tweatter-app">
    <Header :updatedUserProfile="state.updatedProfile" />
    <section>
      <div class="section-top">
        <div class="top-return">
          <span>
            <router-link to="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-arrow-left"
                data-v-01285034=""
              >
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
            </router-link>
          </span>
          <h2 @click="goTop">{{ state.userRequest.username }}</h2>
        </div>
        <div class="top-left"><h2>T</h2></div>
      </div>
      <div class="section-cover">
        <div class="background-cover"></div>
        <div class="user-avatar">
          <img
            v-if="state.userRequest.avatar"
            :src="state.userRequest.avatar"
            alt=""
            width="140"
            height="140"
          />
        </div>
        <div class="user-content">
          <div
            class="btn-wrapper"
            v-if="state.user.username == state.thisRoute"
            @click="editProfile"
          >
            <button>Edit profile</button>
          </div>
          <div v-else class="btn-wrapper">
            <button>Follow</button>
          </div>
          <div class="username">{{ state.userRequest.username }}</div>
        </div>
      </div>
      <div class="tabs">
        <div class="wrapper">
          <div
            class="tweats"
            :class="{ active: state.currentTab == state.thisRoute }"
          >
            <router-link :to="state.link.tweat"> Tweats </router-link>
          </div>
          <div
            class="replies"
            :class="{ active: state.currentTab == 'replies' }"
          >
            <router-link :to="state.link.reply"> Replies </router-link>
          </div>
          <div class="medias" :class="{ active: state.currentTab == 'medias' }">
            <router-link :to="state.link.media"> Medias </router-link>
          </div>
          <div class="likes" :class="{ active: state.currentTab == 'likes' }">
            <router-link :to="state.link.likes"> Likes </router-link>
          </div>
        </div>
      </div>
      <div class="user-tweats-wrapper">
        <!-- <router-view :key="$route.fullPath" /> -->
        <router-view :key="state.key" />
      </div>
    </section>
    <Sidebar />
  </div>
</template>

<script>
import { reactive } from "vue";
import { useRoute } from "vue-router";
import axiosInstance from "@/plugin/axios";
import routes from "@/router/index";

import Header from "@/components/headers/Header";
import Sidebar from "@/components/headers/Sidebar";
import UserEditProfile from "@/components/users/UserEditProfile";

export default {
  name: "UserProfile",
  components: {
    Header,
    Sidebar,
    UserEditProfile,
  },
  setup() {
    const route = useRoute();
    const state = reactive({
      user: {
        username: localStorage.getItem("username"),
        avatar: localStorage.getItem("avatar"),
      },
      link: {
        tweat: `/${route.params.username}`,
        reply: `/${route.params.username}/replies`,
        media: `/${route.params.username}/medias`,
        likes: `/${route.params.username}/likes`,
      },
      key: null,
      userRequest: Object,
      editProfile: false,
      updatedProfile: false,
      thisRoute: route.params.username,
      currentTab: route.fullPath.split("/").pop().toString(),
    });

    async function fetchRequestedUser(username = null) {
      let requestsUser = route.params.username;
      let usernameUser = username ? username : requestsUser;

      await axiosInstance({
        method: "GET",
        url: usernameUser,
      }).then((res) => {
        state.userRequest = res.data.data;
      });
    }

    return {
      state,
      fetchRequestedUser,
    };
  },
  async created() {
    await this.fetchRequestedUser();
  },
  mounted() {
    var vm = this;
    routes.beforeEach((to, from, next) => {
      // to and from are both route objects. must call `next`.
      if (to.matched.some(record => record.meta.reuse === false)) {
        vm.state.key = to.path
      } else {
        vm.state.key = null
      }
      next()
    })
  },
  watch: {
    $route(to) {
      this.state.currentTab = to.fullPath.split("/").pop().toString();
      if (to.params.username === localStorage.getItem("username")) {
        this.state.thisRoute = to.params.username;
        this.state.link.tweat = `/${to.params.username}`;
        this.state.link.reply = `/${to.params.username}/replies`;
        this.state.link.media = `/${to.params.username}/medias`;
        this.state.link.likes = `/${to.params.username}/likes`;

        this.fetchRequestedUser(to.params.username);
        this.state.key = to.params.username;
      }
    },
  },
  methods: {
    goTop() {
      window.scrollTo(0, 0);
    },
    editProfile() {
      this.state.editProfile = true;
    },
    cancelEditProfile() {
      this.state.editProfile = false;
    },
    updatedUser() {
      this.state.user.username = localStorage.getItem("username");
      this.state.user.avatar = localStorage.getItem("avatar");
      this.state.userRequest.username = localStorage.getItem("username");
      this.state.userRequest.avatar = localStorage.getItem("avatar");
      this.state.updatedProfile = true;

      // this.state.key = this.$route.fullPath;
      console.log(this.$route.fullPath)
      this.state.key = this.$route.fullPath;
    },
  },
};
</script>

<style lang="scss" scoped>
section {
  grid-column: span 6;
}

section {
  margin: 0 3rem 0 3rem;
  padding-bottom: 1rem;
  border: 1px solid #222;
  border-top: none !important;
  border-bottom: none !important;
  background: rgb(15, 15, 15);
  .section-top {
    padding: 0.5rem 1rem 0.5rem 1rem;
    top: 0;
    z-index: 999;
    position: sticky;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #222;
    background: #111;
    .top-return {
      display: flex;
      align-items: center;
      span {
        display: flex;
        align-items: center;
        transition: 0.2s ease-in-out;
        a {
          border-radius: 50%;
          padding: 0.3rem;
        }
        svg {
          transform: scale(0.9);
          transition: 0.2s ease-in-out;
        }
        &:hover {
          transition: 0.2s ease-in-out;
          a {
            background: rgba(52, 211, 153, 0.1);
          }
          svg {
            stroke: #34d399;
            transition: 0.2s ease-in-out;
          }
        }
      }
      h2 {
        cursor: pointer;
        margin-left: 1rem;
        font-size: 1.2em;
        font-weight: 600;
      }
    }
    .top-left {
      padding: 0.5rem;
      font-size: 1.2em;
      font-weight: 600;
    }
  }
  .section-cover {
    border-bottom: 1px solid #222;
    .background-cover {
      width: auto;
      height: 13rem;
      background: #333;
      position: relative;
    }
    .user-avatar {
      margin: 0 2rem 0 2rem;
      position: absolute;
      top: 13rem;
      img {
        width: 140px;
        height: 140px;
        border: 3px solid rgb(15, 15, 15);
        border-radius: 50%;
      }
    }
    .user-content {
      .btn-wrapper {
        text-align: right;
        margin: 1rem;
        button {
          padding: 0.5rem 1rem 0.5rem 1rem;
          color: #34d399;
          border: 1px solid #34d399;
          border-radius: 4px;
        }
        button:hover {
          background: rgba(52, 211, 153, 0.1);
        }
      }
      .username {
        margin: 1.5rem 2rem 1rem 2rem;
        font-size: 1.3em;
        font-weight: 600;
      }
    }
  }
  .tabs {
    height: 60px;
    top: 3.8625rem !important;
    position: sticky !important;
    z-index: 999;
    background: #111;
    border-bottom: 1px solid #222;
    .wrapper {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      .active {
        color: #34d399;
        border-bottom: 3px solid #34d399;
      }
      div {
        display: flex;
        justify-content: center;
        align-items: center;
        a {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 1rem 1rem 1rem 1rem;
          width: 100%;
          height: 100%;
        }
      }
      div:hover {
        color: #34d399;
        background: rgba(52, 211, 153, 0.1);
      }
    }
  }
}
</style>
