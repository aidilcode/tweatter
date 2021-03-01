<template>
  <router-view />
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="scss">
@import "./assets/styles/tailwind.css";
* {
  margin: 0;
  outline: none !important;
}
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden !important;
  color: #2c3e50;
  background-color: #111;
}
</style>
