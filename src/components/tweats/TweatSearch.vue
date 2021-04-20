<template>
  <section>
    <TweatItems :tweatUrl="tweatUrl" :searching="true" />
  </section>
</template>

<script>
import TweatItems from './TweatItems'

export default {
  name: "TweatSearch",
  components: {
    TweatItems
  },
  data() {
    return {
      tweatUrl: `tweats/search/?q=${this.$route.query.q}`
    }
  },
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
}
</style>
