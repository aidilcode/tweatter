<template>
  <div class="wrapper">
    <Header :user="state.user" />
    <Tweat
      :user="state.user"
      :tweats="state.tweats"
      @emitFetchData="fetchTweats"
    />
    <Sidenav />
  </div>
</template>

<script>
// import { users as tweats } from "../assets/users";

import axios from "axios";
import { useStore } from "vuex";
import { reactive, computed } from "vue";

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
    const store = useStore();
    const tUser = computed(() => store.state.User.user);

    const state = reactive({
      tweats: [],
      user: tUser.value,
    });

    // function refreshFetchData(tweat) {
    //   console.log(tweat);
    //   state.tweats.unshift({
    //     id: state.tweats.length + 1,
    //     author: state.user.username,
    //     tweat: tweat,
    //     images: null,
    //     likes: null,
    //     comments: null,
    //   });
    // }

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
</style>
