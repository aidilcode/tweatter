<template>
  <div class="overlay-profile-edit">
    <div class="inner" :class="{saving: savingChanges}">
      <div class="wrap">
        <div class="avatar">
          <img :src="EditAvatar" alt="" srcset="" ref="tweatImage" />
          <label for="image" class="tapToChange"></label>
          <input
            type="file"
            id="image"
            ref="image"
            accept="image/*"
            @change="getImgeContent($event)"
          />
        </div>
        <div class="content">
          <div>
            <contenteditable
              id="content-form"
              tag="div"
              :contenteditable="true"
              v-model="changes.username"
              :noNL="true"
              :noHTML="true"
            />
          </div>
          <div class="bio">
            <contenteditable
              id="content-form-bio"
              tag="div"
              :contenteditable="true"
              v-model="changes.bio"
              :noNL="false"
              :noHTML="true"
            />
          </div>
        </div>
      </div>
      <div class="wrap-button">
        <div>
          <button id="cancel" @click="cancelEdit">Cancel</button>
          <button type="submit" @click="updateUserProfile">Save Change</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axiosInstance from "@/plugin/axios";

import contenteditable from "vue-contenteditable";

export default {
  name: "UserEditProfile",
  components: {
    contenteditable,
  },
  props: {
    username: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      getImageContent: false,
      newImageContent: "",
      EditAvatar: "",
      savingChanges: false,
      changes: {
        username: "",
        avatars: "",
        bio: "",
      }
    };
  },
  created() {
    this.fetchUserData();
  },
  methods: {
    async fetchUserData() {
      await axiosInstance({
        method: "GET",
        url: this.username,
      }).then((res) => {
        this.EditAvatar = res.data.data.avatar;
        this.changes.bio = res.data.data.bio;
        this.changes.username = res.data.data.username;
      });
    },
    async updateUserProfile(){
      this.savingChanges = true;

      let access = localStorage.getItem("access_token");
      let formData = new FormData();

      if (this.changes.avatars) {
        formData.append("avatar", this.changes.avatars);
      }
      formData.append("bio", this.changes.bio);
      formData.append("username", this.changes.username);

      await axiosInstance({
        method: "PUT",
        url: this.changes.username,
        data: formData,
        headers: {
          Authorization: `Bearer ${access}`,
          "Content-Type": "application/json;charset=UTF-8",
        },
      })
      .then((res) => {
        this.savingChanges = false;
        this.changes.username = res.data.data.username;
        if (this.changes.avatars) {
          this.changes.avatars = res.data.data.avatar;
        }

        localStorage.setItem("avatar", res.data.data.avatar);
        localStorage.setItem("username", res.data.data.username);

        this.$emit("updatedUser");
        this.$router.push(res.data.data.username);
      })
    },
    getImgeContent(event) {
      this.getImageContent = true;
      this.newImageContent = event.target.files[0];
      this.changes.avatars = event.target.files[0];
      this.$refs.tweatImage.src = URL.createObjectURL(event.target.files[0]);
    },
    cancelEdit() {
      this.$emit("cancelEditProfile");
    },
  },
  watch: {
    unameContentLength: function () {
      if (this.EditUsername == "") {
        this.EditUsername.length = 0;
      }
    },
  }
};
</script>

<style lang="scss" scoped>
.overlay-profile-edit {
  z-index: 9999;
  position: fixed;
  width: 100%;
  max-width: 100%;
  height: 100%;
  max-height: 100%;
  background-color: rgba(17, 17, 17, 0.8);
  .saving {
    border: 1px solid #34d399 !important;
    button[type="submit"] {
      color: #34d399;
      background: rgba(52, 211, 153, 0.1);
    }
  }
  .inner {
    padding: 1.5rem 2rem 1.5rem 2rem;
    width: 38rem;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: rgb(20, 20, 20);
    border: 1px solid #222;
    border-radius: 4px;
    .wrap {
      color: #ccc;
      display: grid;
      grid-template-columns: repeat(6, minmax(0, 1fr));
      .tapToChange {
        top: 1.5rem;
        width: 150px;
        height: 150px;
        z-index: 999;
        cursor: pointer;
        position: absolute;
        border-radius: 50%;
        transition: 0.2s ease-in-out;
        &:hover {
          transition: 0.2s ease-in-out;
          background: rgba(17, 17, 17, 0.7);
        }
      }
      .avatar {
        grid-column: span 2;
        img {
          width: 150px;
          height: 150px;
          overflow: hidden;
          border-radius: 50%;
        }
        input[type="file"] {
          display: none;
        }
      }
      .content {
        grid-column: span 4;
        #content-form {
          word-break: break-all;
          font-size: 2em;
          font-weight: 600;
        }
        #content-form-bio {
          margin-top: 0.5rem;
          word-break: break-all;
        }
      }
      .exceeded {
        border-color: rgb(141, 12, 38) !important;
        div[contenteditable="true"] {
          color: rgb(141, 12, 38) !important;
          &:focus {
            color: rgb(141, 12, 38) !important;
            outline: none !important;
            border-color: rgb(141, 12, 38) !important;
          }
        }
      }
    }
    .wrap-button {
      margin-top: 1.2rem;
      float: right;
      #cancel {
        margin-right: 1rem;
      }
      button {
        padding: 0.5rem 1rem 0.5rem 1rem;
      }
      button[type="submit"] {
        border: 1px solid #34d399;
        border-radius: 4px;
        color: #34d399;
        &:hover {
          background: rgba(52, 211, 153, 0.1);
        }
      }
    }
  }
}
</style>
