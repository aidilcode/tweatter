<template>
  <div class="user-profile">
    <Header :user="state.userData" :inUserView="state.inUserView" />
    <div class="user-wrapper">
      <div class="user-porfile">
        <div class="background-cover"></div>
        <div class="inner">
          <div class="user-top">
            <div>
              <label for="avatar-input"></label>
              <input
                class="change-avatar"
                type="file"
                name="avatar"
                id="avatar-input"
                accept="image/*"
                @change="getAvatarImage($event)"
              />
              <img
                id="current-avatar"
                :src="state.userData.avatar"
                alt=""
                srcset=""
              />
            </div>
          </div>
          <div class="about">
            <p class="text-xl font-semibold">{{ state.userData.username }}</p>
          </div>
        </div>
      </div>
      <div class="tabs-wrapper">
        <div class="tabs">
          <router-link
            :class="{
              active:
                state.inTab == 'tweat' ||
                state.inTab == state.userData.username,
            }"
            :to="state.links.tweat"
            >tweats
          </router-link>
          <router-link
            :class="{ active: state.inTab == 'replies' }"
            :to="state.links.tweat"
            >replies
          </router-link>
          <router-link
            :class="{ active: state.inTab == 'media' }"
            :to="state.links.media"
            >media
          </router-link>
          <router-link
            :class="{ active: state.inTab == 'likes' }"
            :to="state.links.likes"
            >likes
          </router-link>
        </div>
      </div>
      <div class="user-tweat-items" v-if="!state.requestError.error">
        <div class="suggested">
          <span class="font-medium">Suggested For You</span>
          <div class="inner">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat ea a sit laborum cumque quam id corrupti! Harum nam iure magnam nulla earum debitis repudiandae qui maxime, id inventore quis!
          </div>
        </div>
        <router-view />
      </div>
      <div class="request-error" v-else>
        <div>
          {{ state.requestError.msg }}
        </div>
        <div>
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
            class="feather feather-refresh-cw"
          >
            <polyline points="23 4 23 10 17 10"></polyline>
            <polyline points="1 20 1 14 7 14"></polyline>
            <path
              d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"
            ></path>
          </svg>
        </div>
      </div>
    </div>
    <Sidebar />
  </div>
</template>

<script>
import { reactive } from "vue";
import { useRoute } from "vue-router";
import axiosInstance from "@/plugin/axios";

import Header from "@/components/header/Header";
import Sidebar from "@/components/header/Sidebar";

export default {
  name: "UserProfile",
  components: {
    Header,
    Sidebar,
  },
  setup() {
    const route = useRoute();

    const state = reactive({
      inTab: "tweat",
      userData: {
        username: "",
        avatar: "",
      },
      inUserView: true,
      links: {
        tweat: "",
        media: "",
        likes: "",
      },
      currRoute: route.params,
      requestError: {
        error: false,
        msg:
          "There was an error when rendering the page, try to realod the page.",
      },
    });

    async function fetchUserData() {
      let access = localStorage.getItem("access_token");
      let reqUsr = route.params.username;

      const response = await axiosInstance({
        method: "GET",
        url: `${reqUsr}`,
        headers: {
          Authorization: `Bearer ${access}`,
          "Content-Type": "application/json;charset=UTF-8",
        },
      }).catch((err) => {
        console.log("in user profile", err);
      });

      if (typeof response === "object") {
        state.userData.username = response.data.data.username;
        state.userData.avatar = response.data.data.avatar;
        state.links.tweat = `/${reqUsr}`;
        state.links.media = `/${reqUsr}/media`;
        state.links.likes = `/${reqUsr}/likes`;
      } else {
        state.requestError.error = true;
      }
    }

    return {
      state,
      fetchUserData,
    };
  },
  async created() {
    await this.fetchUserData();
  },
  methods: {
    getAvatarImage(e) {
      console.log(e.target.files);
      let cav = document.getElementById("current-avatar");
      cav.src = URL.createObjectURL(e.target.files[0]);
    },
  },
  watch: {
    $route(to) {
      this.state.inTab = to.fullPath.split("/").pop().toString();
    },
  },
};
</script>

<style lang="scss" scoped>
.user-profile {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
}
.user-wrapper {
  font-family: "Roboto", sans-serif;
  grid-column: span 6;
  .user-porfile {
    padding-bottom: 8rem;
    margin: 0 3rem 0 3rem;
    border: 1px solid #222;
    border-top: none !important;
    border-bottom: none !important;
    .background-cover {
      z-index: -99;
      // position: absolute;
      width: auto;
      height: 140px;
      max-width: 586px;
      max-height: 140px;
      background-color: rgb(24, 24, 24);
    }
    .inner {
      z-index: 99;
      position: absolute;
      top: 5rem;
      padding: 0 1.5rem 1.5rem 1.5rem;
      .user-top {
        display: flex;
        justify-content: space-between;
        label {
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
          position: absolute;
          border-radius: 50%;
          width: 110px;
          height: 110px;
          // background-color: rgba(17, 17, 17, 0.5);
        }
        .change-avatar {
          display: none;
        }
        img {
          cursor: pointer;
          background-color: #111;
          border: 5px solid #111;
          border-radius: 50%;
          width: 130px;
          height: 130px;
        }
      }
      .about {
        margin-top: 0.25rem;
        color: #ccc;
      }
    }
  }
  .tabs-wrapper {
    margin: 0 3rem 0 3rem;
    .tabs {
      display: flex;
      justify-content: space-around;
      border: 1px solid #222;
      border-top: none !important;
      .active {
        color: #34d399;
        border-bottom: 3px solid #34d399;
      }
      a {
        color: #ccc;
        padding: 1rem 3.15rem 1rem 3.15rem;
        cursor: pointer;
        width: auto;
        transition: 0.2s ease-in-out;
        &:hover {
          transition: 0.2s ease-in-out;
          color: #34d399;
          background-color: rgb(52, 211, 153, 0.1);
        }
      }
    }
  }
  .user-tweat-items {
    margin: 2rem 3rem 2rem 3rem;
    .suggested {
      color: #ccc;
      .inner {
        margin-top: 1rem;
        height: 18rem;
        max-height: 18rem;
        border-radius: 4px;
        padding: 1rem;
        border: 1px solid #222;
      }
    }
  }
  .request-error {
    color: #ccc;
    padding-top: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    svg {
      margin-top: 0.5rem;
      transform: scale(0.7);
    }
  }
}
</style>
