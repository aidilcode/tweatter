<template>
  <div id="user-profile">
    <div class="head">
      <h2 class="text-3xl font-semibold text-white">@{{ state.user.username }}</h2>
      <div class="badge" v-if="state.user.isAdmin">
        <p class="text-xs">admin</p>
      </div>
    </div>
    <p class="mt-5 text-gray-400">
      <strong>Followers: </strong> {{ state.followers }}
    </p>
  </div>
</template>

<script>
import { reactive, computed } from "vue";
import { users } from "../assets/users";
import { useRoute } from "vue-router";

export default {
  name: "UserProfile",
  setup() {
    const route = useRoute();
    const userId = computed(() => route.params.userId);

    const state = reactive({
      followers: 0,
      user: users[userId.value - 1] || users[0],
    });

    return {
      state,
    };
  },
};
</script>

<style lang="scss" scoped>
#user-profile {
  grid-column: span 1;
  width: 24rem;
  height: 8rem;
  padding: 1rem;
  border-radius: 4px;
  border: 1px solid #333;
  background-color: #222;
  .head {
    display: flex;
    align-items: center;
  }
  .badge {
    margin: 0 1rem 0 1rem;
    padding: 0 0.5rem 0.16rem 0.5rem;
    background-color: #633c9d;
    color: #fff;
    border-radius: 3px;
  }
}
</style>