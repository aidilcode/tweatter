<template>
  <div class="wrapper">
    <Header :inUserView="state.inUserView" :user="state.user" />
    <router-view />
    <Sidebar />
  </div>
</template>

<script>
import { reactive } from 'vue';

import Header from '../components/header/Header'
import Sidebar from '../components/header/Sidebar'

export default {
  name: 'Home',
  components: {
    Header,
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
