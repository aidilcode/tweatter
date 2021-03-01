<template>
  <div class="tweats-wrapper">
    <header>
      <div class="greet font-semibold">
        <span class="text-3xl">Hey {{ user.username }},</span>
        <h1 class="text-7xl">What's Up</h1>
      </div>
    </header>
    <section class="tforms">
      <TweatForm @created="emitFetchData" />
    </section>
    <section class="tweats">
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
      />
    </section>
  </div>
</template>

<script>
import { reactive } from 'vue';
import axiosInstance from '@/plugin/axios'

import LoadingSpinner from "@/components/LoadingSpinner";
import TweatForm from "./TweatForm";
import TweatItems from "./TweatItems";

export default {
  name: "Tweats",
  components: {
    LoadingSpinner,
    TweatForm,
    TweatItems,
  },
  props: {
    user: Object,
  },
  setup() {
    const state = reactive({
      tweats: [],
      tweatsLeng: 0,
      reciveData: false,
    })

    // will be called if there any emit
    // from TweatForm component, and update
    // the current tweats (insert the new tweats to the array)
    async function emitFetchData(emit) {
      state.tweats.unshift({
        id: emit.id,
        author__username: emit.author__username,
        author__avatar_url: emit.author__avatar_url,
        tweat: emit.tweat,
        picture_url: emit.picture_url,
        created_at: emit.created_at,
      })
    }

    // fetch all tweats from tweatter api
    async function fetchTweats() {
      const tweatsAll = await axiosInstance({
        method: 'GET',
        url: 'tweats/',
      }).catch((err) => console.error(err))

      state.tweats = tweatsAll.data.data;
      state.reciveData = true;
    }

    return {
      state,
      emitFetchData,
      fetchTweats
    }
  },
  async created() {
    await this.fetchTweats();
  },
}
</script>

<style lang="scss" scoped>
.tweats-wrapper {
  grid-column: span 6;
  min-height: 100vh;
  padding: 0 4rem 0 4rem;
  header {
    padding-top: 3rem;
    color: #eee;
    font-family: 'Montserrat Alternates', sans-serif;
  }
  section {
    margin: 1rem 0 1rem 0;
  }
  .tforms {

  }
  .tweats {
    .spin-loader {
      display: flex;
      justify-content: center;
      margin-top: 1rem;;
    }
  }
}
</style>