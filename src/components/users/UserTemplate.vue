<template>
  <TweatItems :tweatUrl="state.tweatUrl + url" :requestUser="state.thisRoute" />
</template>

<script>
import { reactive } from "vue";
import { useRoute } from "vue-router";

import TweatItems from "@/components/tweats/TweatItems"

export default {
  name: "UserTemplate",
  components:{
    TweatItems
  },
  props: {
    url: {
      type: String,
      required: true,
    }
  },
  setup() {
    const route = useRoute();
    const state = reactive({
      tweatUrl: route.params.username,
      thisRoute: route.params.username,
    });

    return { state };
  },
};
</script>

<style lang="scss" scoped>
</style>
