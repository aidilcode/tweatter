<template>
  <UserTemplate :url="'/replies'" :loadThreadComment="true" />
</template>

<script>
import UserTemplate from "@/components/users/UserTemplate"

export default {
  name: "UserReplies",
  components:{
    UserTemplate
  },
};
</script>

<style lang="scss" scoped>
</style>
