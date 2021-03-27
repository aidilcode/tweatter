<template>
  <div class="tweats-wrapper">
    <header>
      <div class="greet font-semibold">
        <span class="text-3xl">Hi {{ state.username }},</span>
        <h1 class="text-7xl">What's Up</h1>
      </div>
    </header>
    <section class="tforms">
      <TweatForm @created="emitFetchData" />
    </section>
    <section
      class="tweats"
    >
      <LoadingSpinner v-if="state.reciveData" class="spin-loader" />
        <TweatItems
          v-for="tweat in state.tweats"
          :key="tweat.id"
          :id="tweat.id"
          :author="tweat.author.username"
          :authorAvatar="tweat.author.avatar_url"
          :tweat="tweat.tweat"
          :likes="tweat.likes"
          :likes_count="tweat.likes_count"
          :pictureUrl="tweat.picture_url"
          :createdAt="tweat.created_at"
        />
      <div v-if="state.endOf.state" class="end-of">
        {{state.endOf.msg}}
      </div>
    </section>
  </div>
</template>

<script>
import { reactive } from "vue";
import axiosInstance from "@/plugin/axios";

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
  setup() {
    const state = reactive({
      username: localStorage.getItem("username"),
      tweats: [],
      next: "",
      tweatsLeng: 0,
      reciveData: false,
      endOf: {
        state: false,
        msg: ""
      },
      breakLoad: 0,
    });

    // fetch all tweats from tweatter api
    async function fetchTweats() {
      state.reciveData = true;
      await axiosInstance({
        method: "GET",
        url: "tweats/",
      })
        .then((res) => {
          state.reciveData = false;
          state.tweats = res.data.results;
          state.next = res.data.next;
        })
        .catch((err) => {
          state.reciveData = false;
          console.error(err);
          alert("Something is wrong, try to reload the page.");
        });
    }

    // will be called if there any emit
    // from TweatForm component, and update
    // the current tweats (insert the new tweats to the array)
    async function emitFetchData() {
      await fetchTweats();
    }

    return {
      state,
      emitFetchData,
      fetchTweats,
    };
  },
  async created() {
    await this.fetchTweats();
  },
  methods: {
    loadMore: function () {
      if (this.state.next === null) {
        this.state.endOf.state = true;
        this.state.endOf.msg = "No more content to show";
        return
      }

      if (this.state.breakLoad <= Date.now()) {
        axiosInstance({
          method: "GET",
          url: this.state.next,
        })
          .then((res) => {
            this.state.breakLoad = Date.now() + 1000; // 1seconds
            this.state.tweats.push(...res.data.results);
            this.state.next = res.data.next;
          })
      }
    }
  },
  mounted() {
    let vm = this;
    window.addEventListener("scroll", function () {
      let scTop = this.document.documentElement.scrollTop;
      let scHeight = this.document.documentElement.scrollHeight;
      let scClient = this.document.documentElement.clientHeight;

      if (scTop + scClient == scHeight && !vm.state.endOf.msg) {
        vm.loadMore();
      }
    })
  },
};
</script>

<style lang="scss" scoped>
.tweats-wrapper {
  grid-column: span 6;
  min-height: 100vh;
  padding: 0 4rem 0 4rem;
  header {
    padding-top: 3rem;
    color: #eee;
    font-family: "Montserrat Alternates", sans-serif;
  }
  section {
    margin: 1rem 0 1rem 0;
  }
  .tweats {
    .spin-loader {
      display: flex;
      justify-content: center;
      margin-top: 1rem;
    }
    .end-of {
      color: #fff;
      display: flex;
      justify-content: center;
      margin-top: 3rem;
      margin-bottom: 2rem;
    }
  }
}
</style>