<template>
  <UserTemplate :url="'/likes'" />
</template>

<script>
import UserTemplate from "@/components/users/UserTemplate"

export default {
  name: "UserLikes",
  components:{
    UserTemplate
  },
};
</script>

<style lang="scss" scoped>
</style>
