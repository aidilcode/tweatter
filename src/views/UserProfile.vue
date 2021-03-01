<template>
  <div class="user-profile">
    <Header :user="user" :inUserView="state.inUserView" />
    <div class="user-wrapper">
      <div class="user-porfile">
        <div class="background-cover"></div>
        <div class="inner">
          <div class="avatar">
            <img :src="state.userData.avatar" alt="" srcset="">
          </div>
          <div class="about">
            <p class="text-xl font-semibold">{{ state.userData.username }}</p>
          </div>
        </div>
      </div>
      <div class="tabs">
        <router-link :to="state.links.tweat">tweats</router-link>
        <router-link :to="state.links.media">media</router-link>
        <router-link :to="state.links.likes">likes</router-link>
      </div>
      <div class="user-tweat-items">
        <router-view />
      </div>
    </div>
    <Sidebar />
  </div>
</template>

<script>
import { reactive } from 'vue'
import { useRoute } from 'vue-router'
import axiosInstance from '@/plugin/axios'

import Header from '@/components/header/Header'
import Sidebar from '@/components/header/Sidebar'

export default {
  name: 'UserProfile',
  components: {
    Header,
    Sidebar,
  },
  props: {
    user: Object
  },
  setup() {
    const route = useRoute()
    const requestUser = route.params.username

    const state = reactive({
      userData: {
        username: '',
        avatar: '',
      },
      inUserView: true,
      links: {
        tweat: `/${requestUser}`,
        media: `/${requestUser}/media`,
        likes: `/${requestUser}/likes`,
      },
      currRoute: route.params,
    })

    async function fetchUserData() {
      let access = localStorage.getItem('access_token')

      const response = await axiosInstance({
        method: 'GET',
        url: `${requestUser}`,
        headers: {
          Authorization: `Bearer ${access}`,
          "Content-Type": "application/json;charset=UTF-8",
        },
      }).catch((err) => {
        if (err.response.status == 400) {
          console.error(err)
        }
      });

      state.userData.username = response.data.data.username
      state.userData.avatar = response.data.data.avatar
    }

    return {
      state,
      fetchUserData,
    }
  },
  async created() {
    await this.fetchUserData()
  },
}
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
      width : auto;
      height: 140px;
      max-width : 586px;
      max-height: 140px;
      background-color: rgb(24, 24, 24);
    }
    .inner {
      z-index: 99;
      position: absolute;
      top: 5rem;
      padding: 0 1.5rem 1.5rem 1.5rem;
      .avatar {
        img {
          background-color: #111;
          border: 5px solid #111;
          border-radius: 50%;
          width: 110px;
          height: 110px;
        }
      }
      .about {
        margin-top: 1rem;
        color: #ccc;
      }
    }
  }
  .tabs {
    display: flex;
    justify-content: space-between;
    border: 1px solid #222;
    border-top: none !important;
    margin: 0 3rem 1rem 3rem;
    .active {
      color: #34D399;
      border-bottom: 3px solid #34D399;
    }
    a {
      color: #ccc;
      padding: 1rem 4.7rem 1rem 4.7rem;
      cursor: pointer;
      width: auto;
      transition: 0.2s ease-in-out;
      &:hover {
        transition: 0.2s ease-in-out;
        color: #34D399;
        background-color: rgb(52, 211, 153, 0.1);
      }
    }
  }
  .user-tweat-items {
    margin: 2rem 3rem 2rem 3rem;
  }
}
</style>
