<template>
  <UserTemplate :url="'/tweats'" />
</template>

<script>
import UserTemplate from "@/components/users/UserTemplate"

export default {
  name: "UserTweat",
  components:{
    UserTemplate
  },
};
</script>

<style lang="scss" scoped>
</style>
