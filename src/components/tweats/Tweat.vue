<template>
  <section>
    <div class="section-top">
      <div class="wrap-top">
        <router-link :to="user.username" class="user-profile-top">
          <img :src="user.avatar" alt="" width="40" height="40">
        </router-link>
        <h2>
          <router-link to="/">Home</router-link>
        </h2>
      </div>
      <div><h2>T</h2></div>
    </div>
    <TweatForms @createTweat="createdTweat" />
    <TweatItems :tweatUrl="tweatUrl" :fetchAgain="fetchAgain" @fetchedNewTweats="fetched" />
  </section>
</template>

<script>
import TweatItems from "./TweatItems";
import TweatForms from "./TweatForms";

export default {
  name: "Tweat",
  components: {
    TweatItems,
    TweatForms,
  },
  data() {
    return {
      tweatUrl: "tweats/",
      fetchAgain: false,
      user: {
        username: localStorage.getItem("username"),
        avatar: localStorage.getItem("avatar"),
      }
    };
  },
  methods: {
    createdTweat() {
      this.fetchAgain = true;
    },
    fetched() {
      this.fetchAgain = false;
    }
  }
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
    padding: 1.25rem 2rem 1.25rem 2rem;
    top: 0;
    z-index: 999;
    position: sticky;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #222;
    background: #111;
    .user-profile-top {
      display: none;
    }
    h2 {
      font-size: 1.2em;
      font-weight: 600;
    }
  }
}
</style>
