<template>
  <div>Settings</div>
  <ul>
    <li
      :class="{ active: inTab == 'account' }"
      id="account"
      @click.prevent="changeTab($event)"
    >
      Your Account
    </li>
    <li
      :class="{ active: inTab == 'security' }"
      id="security"
      @click.prevent="changeTab($event)"
    >
      Security
    </li>
    <li
      :class="{ active: inTab == 'privacy' }"
      id="privacy"
      @click.prevent="changeTab($event)"
    >
      Privacy and savety
    </li>
    <li
      :class="{ active: inTab == 'notif' }"
      id="notif"
      @click.prevent="changeTab($event)"
    >
      Notification
    </li>
    <li
      :class="{ active: inTab == 'access' }"
      id="access"
      @click.prevent="changeTab($event)"
    >
      Accessibility, languages
    </li>
  </ul>
</template>

<script>
export default {
  name: "HeaderContentSetting",
  data() {
    return {
      inTab: "account",
    };
  },
  methods: {
    changeTab(e) {
      this.inTab = (e.target.id).toString();
    },
  },
};
</script>

<style lang="scss" scoped>
div {
  font-weight: 600;
  font-size: 1.3rem;
  color: #ddd;
  padding: 1.2rem;
  border-bottom: 1px solid #222;
}
ul {
  color: #ddd;
  display: flex;
  flex-direction: column !important;
  .active {
    background-color: rgba(34, 34, 34, 0.7);
    border-right: 2px solid #34d399;
  }
  li {
    cursor: pointer;
    padding: 1.2rem;
    transition: 0.2s ease-in-out;
    &:hover {
      transition: 0.2s ease-in-out;
      background-color: rgba(34, 34, 34, 0.7);
    }
  }
}
</style>
