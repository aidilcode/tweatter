<template>
  <div class="wrapper">
    <Header :inSettingView="inSettingView" />
    <div class="settings">
      <div class="user-profile">
        <form @submit.prevent="saveChanges">
          <div class="profile">
            <label for="avatar-input"></label>
            <input
              class="change-avatar"
              type="file"
              name="avatar"
              id="avatar-input"
              accept="image/*"
              @change="getAvatarImage($event)"
            />
            <img id="current-avatar" :src="state.userData.avatar" alt="">
            <div class="username">
              <contenteditable
                tag="div"
                :contenteditable="true"
                v-model="state.changes.uname"
                :noNL="true"
                :noHTML="true"
                class="uname"
              />
              <span>@{{ state.userData.username }}</span>
            </div>
          </div>
          <div class="bio">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium sapiente quas eveniet aperiam sit nam obcaecati quod officia. Quasi quia tempore molestiae nemo harum saepe veritatis sed, et eveniet voluptatibus.
          </div>
          <div class="submit-changes">
            <button :class="{'submitting': submitting}" type="submit">save change</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axiosInstance from "@/plugin/axios";
import {reactive} from 'vue';
import contenteditable from "vue-contenteditable";

import Header from '../components/header/Header'

export default {
  name: "Settings",
  components: {
    Header,
    contenteditable
  },
  data() {
    return {
      inSettingView: true,
      submitting: false,
    }
  },
  setup() {
    const state = reactive({
      userData: {
        username: localStorage.getItem("username"),
        avatar: localStorage.getItem("avatar"),
      },
      changes: {
        avatar: "",
        uname: localStorage.getItem("username")
      }
    });

    async function saveChanges() {
      this.submitting = true;
      let formData = new FormData();
      let access = localStorage.getItem("access_token");

      // append data
      if (state.changes.avatar) {
        formData.append("avatar", state.changes.avatar);
      }
      formData.append("username", state.changes.uname);

      await axiosInstance({
        method: "PUT",
        url: `${localStorage.getItem("username")}`,
        data: formData,
        headers: {
          Authorization: `Bearer ${access}`,
          "Content-Type": "application/json;charset=UTF-8",
        },
      })
      .then((res) => {
        localStorage.setItem("avatar", res.data.data.avatar);
        localStorage.setItem("username", res.data.data.username);
        this.submitting = false;
      })
      .catch((err) => {
        console.error(err)
      });
    }

    return {
      state,
      saveChanges
    }
  },
  methods: {
    getAvatarImage(e) {
      let cav = document.getElementById("current-avatar");
      cav.src = URL.createObjectURL(e.target.files[0]);
      this.state.changes.avatar = e.target.files[0];
    },
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
}
.settings {
  grid-column: span 9;
  border-left: 1px solid #222;
  padding: 4rem;
  margin-left: 2rem;
  .profile {
    display: flex;
    label {
      cursor: pointer;
      position: absolute;
      border-radius: 100%;
      width: 200px;
      height: 200px;
      &:hover {
        background-color: rgba(0, 0, 0, 0.25);
      }
    }
    .change-avatar {
      display: none;
    }
    img {
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
      border-radius: 100%;
      width: 200px;
      height: 200px;
    }
    .username {
      width: 100%;
      clear: both !important;
      display: inline-block;
      margin-left: 2rem;
      .uname {
        outline: none;
        word-break: break-all;
        color: #ddd;
        font-size: 3rem;
      }
      span {
        color: #bbb;
        font-size: 1.2rem;
      }
    }
  }
  .bio {
    color: #bbb;
    margin-top: 2rem;
    width: 75%;
  }
  .submitting {
    background-color: rgb(29, 29, 29);
  }
  .submit-changes {
    position: absolute;
    bottom: 2rem;
    button {
      color: #ddd;
      border-radius: 4px;
      border: 1px solid #222;
      padding: 0.75rem 3rem 1rem 3rem;
      transition: 0.2s ease-in-out;
      &:hover {
        transition: 0.2s ease-in-out;
        background-color: rgb(29, 29, 29);
      }
    }
  }
}
</style>