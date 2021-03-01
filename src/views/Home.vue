<template>
  <div class="wrapper">
    <Header :inUserView="state.inUserView" :user="state.user" />
    <Tweats :user="state.user" />
    <Sidebar />
  </div>
</template>

<script>
import { reactive } from 'vue';

import Header from '../components/header/Header'
import Tweats from '../components/tweats/Tweats'
import Sidebar from '../components/header/Sidebar'

export default {
  name: 'Home',
  components: {
    Header,
    Tweats,
    Sidebar,
  },
  setup() {
    const state = reactive({
      inUserView: false,
      user: {
        username: localStorage.getItem('username'),
        avatar: localStorage.getItem('avatar'),
      }
    })

    return {
      state,
    }
  },
}
</script>

<style lang="scss" scoped>
.wrapper {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
}
</style>
