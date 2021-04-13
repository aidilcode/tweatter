<template>
  <div id="tweatter-app">
    <Header />
    <router-view />
    <Sidebar />
  </div>
</template>

<script>
import {reactive} from 'vue';
import Header from '@/components/headers/Header';
import Sidebar from '@/components/headers/Sidebar';

export default {
  name: 'Home',
  components: {
    Header,
    Sidebar
  },
  setup() {
    const state = reactive({
      user: {
        username: localStorage.getItem('username'),
        avatar: localStorage.getItem('avatar'),
      }
    });

    return {
      state,
    }
  },
}
</script>

<style lang="scss" scoped>
</style>
