<template>
  <div class="wrapper">
    <Header :user="state.user" :inUserView="state.inUserView" />
    <div class="user-wrapper">
      <div class="user-porfile">
        <div class="background-cover"></div>
        <div class="inner">
          <div class="avatar">
            <img :src="state.user.avatar" alt="" srcset="">
          </div>
          <div class="about">
            <p class="text-xl font-semibold">{{ state.user.username }}</p>
          </div>
        </div>
      </div>
      <div class="tabs">
        <div class="active">tweats</div>
        <div>media</div>
        <div>likes</div>
      </div>
      <div class="user-tweat-items">
        <LoadingSpinner v-if="!state.reciveData" class="spin-loader" />
        <TweatItems
          v-for="tweat in state.tweats"
          :key="tweat.id"
          :tweatId="tweat.id"
          :author="tweat.author__username"
          :authorAvatar="tweat.author__avatar_url"
          :tweat="tweat.tweat"
          :pictureUrl="tweat.picture_url"
          :createdAt="tweat.created_at"
          @deleted="fetchTweats"
        />
      </div>
    </div>
    <Sidenav />
  </div>
</template>

<script>
import axios from "axios";
import { reactive } from "vue";
import Header from "@/components/home/Header";
import TweatItems from "../components/tweat/TweatItems";
import Sidenav from "@/components/home/Sidenav";
import LoadingSpinner from "@/components/LoadingSpinner";

export default {
  name: "UserProfile",
  components: {
    Header,
    TweatItems,
    Sidenav,
    LoadingSpinner,
  },
  setup() {
    const state = reactive({
      user: {
        username: localStorage.getItem("username"),
        avatar: localStorage.getItem("avatar"),
      },
      tweats: [],
      inUserView: true,
      reciveData: false,
    });

    async function fetchTweats() {
      const userTweats = await axios({
        method: "GET",
        url: `http://localhost:8000/api/${state.user.username}`,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
      }).catch((err) => console.error(err));

      state.tweats = userTweats.data.data;
      state.reciveData = true;
    }

    return {
      state,
      fetchTweats,
    };
  },
  async created() {
    await this.fetchTweats();
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
}
.user-wrapper {
  font-family: "Roboto", sans-serif;
  grid-column: span 6;
  .user-porfile {
    padding-bottom: 2rem;
    margin: 0 3rem 0 3rem;
    border: 1px solid #222;
    border-top: none !important;
    border-bottom: none !important;
    .background-cover {
      z-index: -99;
      position: absolute;
      width : 576px;
      height: 140px;
      max-width : 576px;
      max-height: 140px;
      background-color: rgb(24, 24, 24);
    }
    .inner {
      padding: 4.75rem 1.5rem 1.5rem 1.5rem;
      .avatar {
        img {
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
    div {
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
    .spin-loader {
      display: flex;
      justify-content: center;
      margin-top: 1rem;;
    }
  }
}
</style>