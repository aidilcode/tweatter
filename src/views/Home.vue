<template>
  <div class="wrapper">
    <Header :user="state.user" :inUserView="state.inUserView" />
    <Tweat
      :reciveData="state.reciveData"
      :user="state.user"
      :tweats="state.tweats"
      @emitFetchData="updateTweats"
    />
    <Sidenav />
  </div>
</template>

<script>
import axios from "axios";
import { reactive } from "vue";

import Tweat from "./Tweat";
import Header from "@/components/home/Header";
import Sidenav from "@/components/home/Sidenav";

export default {
  name: "Home",
  components: {
    Tweat,
    Header,
    Sidenav,
  },
  setup() {
    // const store = useStore();
    // console.log(store.state.User)
    // const tUser = computed(() => store.state.User.user);

    const state = reactive({
      tweats: [],
      tweats_length: 0,
      inUserView: false,
      user: {
        "username": localStorage.getItem("username"),
        "avatar": localStorage.getItem("avatar"),
      },
      reciveData: false,
    });

    async function updateTweats(emit) {
      state.tweats.unshift({
        id: emit.id,
        author__username: emit.author__username,
        author__avatar_url: emit.author__avatar_url,
        tweat: emit.tweat,
        picture_url: emit.picture_url,
        created_at: emit.created_at,
      })
    }

    async function fetchTweats() {
      const userTweats = await axios({
        method: 'GET',
        url: 'http://localhost:8000/api/tweats/',
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8"
        }
      }).catch((err) => console.error(err))

      state.tweats = userTweats.data.data;
      state.reciveData = true;
    }

    async function calcTweatsLength() {
      return state.tweats_length.length
    }

    return {
      state,
      fetchTweats,
      calcTweatsLength,
      updateTweats,
    };
  },
  async created() {
    await this.fetchTweats();
  },
  async mounted() {
    await this.calcTweatsLength();
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
}
</style>
