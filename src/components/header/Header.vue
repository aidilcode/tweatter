<template>
  <div v-if="isLogout" class="overlay">
    <div class="inner">
      <div class="wrap">
        <LoadingSpinner />
        logging out
      </div>
    </div>
  </div>
  <div class="header">
    <div class="wrapper">
      <!-- header navigations -->
      <div class="navigation">
        <div class="logo">
          <router-link to="/">T</router-link>
        </div>
        <nav class="nav-top">
          <ul class="nav-wrapper">
            <li class="nav-item active">
              <router-link to="/" class="link"><FeatherGrid /></router-link>
            </li>
            <li class="nav-item">
              <router-link to="/" class="link"><FeatherHash /></router-link>
            </li>
            <li class="nav-item">
              <router-link to="/" class="link"><FeatherBookmark /></router-link>
            </li>
            <li class="nav-item">
              <router-link to="/settings" class="link"
                ><FeatherMoreVertical
              /></router-link>
            </li>
          </ul>
        </nav>
        <nav class="nav-bottom">
          <div class="nav-wrapper">
            <div class="nav-item">
              <div @click="logout"><FeatherLogout /></div>
            </div>
          </div>
        </nav>
      </div>
      <!-- header content -->
      <div v-if="inUserView" class="wrapper-content">
        <HeaderContentUser :user="user" />
      </div>
      <div v-else-if="inSettingView" class="wrapper-content-settings">
        <HeaderContentSetting />
      </div>
      <div v-else class="wrapper-content">
        <HeaderContent :user="user" />
      </div>
    </div>
  </div>
</template>

<script>
import axiosInstance from "@/plugin/axios";

import FeatherGrid from "@/components/icons/FeatherGrid";
import FeatherHash from "@/components/icons/FeatherHash";
import FeatherBookmark from "@/components/icons/FeatherBookmark";
import FeatherMoreVertical from "@/components/icons/FeatherMoreVertical";
import FeatherLogout from "@/components/icons/FeatherLogout";
import LoadingSpinner from "@/components/LoadingSpinner";

import HeaderContent from "./HeaderContent";
import HeaderContentUser from "./HeaderContentUser";
import HeaderContentSetting from "./HeaderContentSetting";

export default {
  name: "Header",
  components: {
    FeatherMoreVertical,
    FeatherGrid,
    FeatherHash,
    FeatherBookmark,
    FeatherLogout,

    HeaderContent,
    HeaderContentUser,
    HeaderContentSetting,
    LoadingSpinner,
  },
  props: {
    user: Object,
    inUserView: Boolean,
    inSettingView: Boolean,
  },
  data() {
    return {
      isLogout: false,
    };
  },
  methods: {
    // user logout function
    async logout() {
      this.isLogout = true;
      let access = localStorage.getItem("access_token");
      let refresh = localStorage.getItem("refresh_token");

      await axiosInstance({
        method: "POST",
        url: "logout/",
        data: { refresh_token: refresh },
        headers: {
          Authorization: `Bearer ${access}`,
          "Content-Type": "application/json;charset=UTF-8",
        },
      })
        .catch(() => {})
        .then(() => {
          this.$router.push("/login");
        });

      // remote all related user in local-storage
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("username");
      localStorage.removeItem("avatar");
      localStorage.removeItem("isLogin");
      // set header auth to null, in order to
      // prevent user action after logout
      axiosInstance.defaults.headers["Authorization"] = null;
      this.isLogout = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.overlay {
  z-index: 999;
  position: fixed;
  width: 100%;
  max-width: 100%;
  height: 100%;
  max-height: 100%;
  background-color: rgba(17, 17, 17, 0.8);
  .inner {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .wrap {
      color: #ccc;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column !important;
    }
  }
}
.header {
  // background-color: #333;
  grid-column: span 3;
  font-family: "Montserrat Alternates", sans-serif;
  .wrapper {
    min-height: 100vh;
    height: 100%;
    max-height: 100%;
    display: grid;
    grid-template-columns: repeat(6, minmax(0, 1fr));
    .navigation {
      grid-column: span 1;
      position: fixed;
      min-height: 100vh;
      height: 100%;
      max-height: 100%;
      width: 5rem;
      z-index: 99;
      text-align: center;
      border-right: 1px solid #222;
      transform: translate3d(0, 0, 0);
      transition: all 350ms 50ms cubic-bezier(0.645, 0.045, 0.355, 1);
      .logo {
        color: #fff;
        margin-bottom: 2rem;
        font-size: 2em;
        display: flex;
        justify-content: center;
        text-align: center;
        padding: 0.5rem 0.5rem 0.5rem 0.5rem;
      }
    }
    .navigation {
      .nav-top {
        position: absolute;
        top: 50%;
        width: 100%;
        transform: translateY(-50%);
        list-style-type: none;
        padding-left: 0;
        .nav-wrapper {
          .active {
            svg {
              stroke: #34d399;
            }
          }
          .nav-item {
            position: relative;
            display: flex;
            justify-content: center;
            text-align: center;
            padding: 0 1rem 0 1rem;
            color: #ccc;
            svg {
              transition: 0.2s ease-in-out;
            }
            &:hover {
              svg {
                transition: 0.2s ease-in-out;
                stroke: #34d399;
              }
            }
            .link {
              display: inline-block;
              border-radius: 50%;
              padding: 1rem;
              transition: 0.2s ease-in-out;
              &:hover {
                transition: 0.2s ease-in-out;
                background-color: rgb(52, 211, 153, 0.1);
              }
            }
          }
        }
      }
      .nav-bottom {
        position: absolute;
        bottom: 0;
        padding: 1rem;
        .nav-wrapper {
          color: #ccc;
          padding: 0.72rem;
          cursor: pointer;
          border-radius: 40px;
          transition: 0.2s ease-in-out;
          svg {
            transition: 0.2s ease-in-out;
          }
          &:hover {
            transition: 0.2s ease-in-out;
            background-color: rgba(155, 79, 94, 0.1);
            svg {
              transition: 0.2s ease-in-out;
              stroke: crimson;
            }
          }
        }
      }
    }
    .wrapper-content {
      grid-column: span 5;
      position: fixed;
      left: 5rem;
      min-height: 100vh;
      height: 100%;
      max-height: 100%;
      width: 13.25rem;
      margin: 0 1.5rem 0 1.5rem;
    }
    .wrapper-content-settings {
      // font-family: "Roboto", sans-serif;
      grid-column: span 5;
      position: fixed;
      left: 5rem;
      min-height: 100vh;
      height: 100%;
      max-height: 100%;
      width: 18.3rem;
    }
  }
}
</style>
