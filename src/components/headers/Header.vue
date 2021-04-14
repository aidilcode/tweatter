<template>
  <header>
    <nav>
      <div class="nav-logo">
        <router-link to="/">T</router-link>
      </div>
      <ul class="nav-items">
        <li class="item active">
          <router-link to="/">
            <FeatherGrid />
          </router-link>
        </li>
        <li class="item">
          <router-link to="/">
            <FeatherHash />
          </router-link>
        </li>
        <li class="item">
          <router-link to="/">
            <FeatherBookmark />
          </router-link>
        </li>
        <li class="item">
          <router-link to="/">
            <FeatherMoreVertical />
          </router-link>
        </li>
        <li class="item item-logout">
          <router-link to="/" @click="logout">
            <FeatherLogout />
          </router-link>
        </li>
      </ul>
      <div class="nav-bottom">
        <div class="avatar-bottom">
          <img
            :src="avatar"
            alt=""
            width="35"
            height="35"
          />
        </div>
        <div class="content" @click="logout">
          <span><FeatherLogout /></span>
        </div>
      </div>
    </nav>
    <Aside />
  </header>
</template>

<script>
import axiosInstance from "@/plugin/axios";

import FeatherLogout from "@/components/icons/FeatherLogout";
import FeatherGrid from "@/components/icons/FeatherGrid";
import FeatherHash from "@/components/icons/FeatherHash";
import FeatherBookmark from "@/components/icons/FeatherBookmark";
import FeatherMoreVertical from "@/components/icons/FeatherMoreVertical";

import Aside from "./Aside";

export default {
  name: "Header",
  components: {
    FeatherMoreVertical,
    FeatherGrid,
    FeatherHash,
    FeatherBookmark,
    FeatherLogout,

    Aside,
  },
  data() {
    return {
      avatar: localStorage.getItem("avatar"),
    }
  },
  methods: {
    // user logout function
    async logout() {
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

      // remove all related user in local-storage
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("username");
      localStorage.removeItem("avatar");
      // set header auth to null, in order to
      // prevent user action after logout
      axiosInstance.defaults.headers["Authorization"] = null;
    },
  },
};
</script>

<style lang="scss" scoped>
// header
header {
  grid-column: span 3;
  display: grid;
  grid-template-columns: repeat(8, minmax(0, 1fr));
  background: #111;
  nav {
    width: auto;
    height: 100vh;
    grid-column: span 2;
    border-right: 1px solid #222;
  }
  aside {
    width: auto;
    height: 100vh;
    grid-column: span 6;
    border-right: 1px solid #222;
  }
}

header {
  nav {
    top: 0;
    position: sticky;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    .nav-logo {
      margin: 1rem 0 0 0;
      font-size: 2em;
    }
    .nav-items {
      .active {
        svg {
          stroke: #34d399;
        }
      }
      .item {
        margin: 0.5rem 0 0.5rem 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        border-radius: 50%;
        a {
          padding: 0.75rem;
          color: crimson;
          display: inline-block;
          border-radius: 50%;
          color: #bbb;
          svg {
            transform: scale(0.9);
            transition: 0.2s ease-in-out;
          }
        }
        &:hover {
          transition: 0.2s ease-in-out;
          background: rgba(52, 211, 153, 0.1);
          svg {
            stroke: #34d399;
            transition: 0.2s ease-in-out;
          }
        }
      }
      .item-logout {
        display: none;
      }
    }
    .nav-bottom {
      margin: 0 0 1rem 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      .avatar-bottom {
        display: none;
      }
      .content {
        margin-top: 1rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        border-radius: 50%;
        span {
          padding: 0.75rem;
          display: inline-block;
          border-radius: 50%;
          color: #bbb;
          cursor: pointer;
          svg {
            transform: scale(0.9);
            transition: 0.2s ease-in-out;
          }
        }
        &:hover {
          transition: 0.2s ease-in-out;
          background-color: rgba(155, 79, 94, 0.1);
          svg {
            stroke: crimson;
            transition: 0.2s ease-in-out;
          }
        }
      }
    }
  }
}
</style>
