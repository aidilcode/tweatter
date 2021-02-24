<template>
  <div class="tweat-wrapper">
    <header>
      <div class="top">
        <div class="greet font-semibold">
          <span>Hey {{ user.username }},</span>
          <h1>What's Up</h1>
        </div>
      </div>
    </header>
    <div class="tweat-form">
      <TweatForm @created="emitResponse" />
    </div>
    <section>
      <TweatItems
        v-for="tweat in tweats"
        :key="tweat.id"
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
import TweatItems from "../components/tweat/TweatItems";
import TweatForm from "../components/tweat/TweatForm"

export default {
  name: "Tweat",
  components: {
    TweatItems, TweatForm
  },
  props: {
    user: Object,
    tweats: Object
  },
  methods: {
    emitResponse() {
      this.$emit('emitFetchData');
    }
  }
};
</script>

<style lang="scss" scoped>
.tweat-wrapper {
  grid-column: span 6;
  min-height: 100vh;
  margin: 0 4.5rem 2rem 1.5rem;
  header {
    margin-top: 2rem;
    .top {
      padding: 1rem;
      display: flex;
      justify-content: space-between;
      font-family: 'Montserrat Alternates', sans-serif;
      span {
        font-size: 1.2em;
      }
      .greet {
        color: #eee;
        h1 {
          font-size: 4.75em;
        }
      }
    }
  }
  section {
    padding: 1rem;
  }
}
</style>
