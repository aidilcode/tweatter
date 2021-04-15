<template>
  <aside>
    <div class="aside-wrapper">
      <div class="user">
        <div class="info">
          <img :src="user.avatar" alt="" width="35" height="35" />
          <span
            ><router-link
              :to="{
                name: 'UserProfile',
                params: { username: user.username },
              }"
              >{{ user.username }}</router-link
            ></span
          >
        </div>
        <div class="about">
          <small
            >{{ user.bio }}</small
          >
        </div>
      </div>
      <div class="contents">
        <div class="maker">
          <label for="file"><span>+</span></label>
          <input type="file" name="file" id="file" />
        </div>
        <div class="videos-wrapper">
          <div class="video vid-2"></div>
          <div class="video vid-3"></div>
          <div class="video vid-4"></div>
          <div class="video vid-5"></div>
        </div>
      </div>
    </div>
  </aside>
</template>

<script>
import axiosInstance from "@/plugin/axios";

export default {
  name: "Aside",
  props: {
    updatedUserProfile: {
      type: Boolean,
      required: true,
    }
  },
  data() {
    return {
      user: {
        username: localStorage.getItem("username"),
        avatar: localStorage.getItem("avatar"),
        bio: "",
      },
    };
  },
  watch: {
    updatedUserProfile: function () {
      this.fetchRequestedUser();
    }
  },
  methods: {
    async fetchRequestedUser() {
      let requestsUser = localStorage.getItem("username");

      await axiosInstance({
        method: "GET",
        url: requestsUser,
      }).then((res) => {
        this.user.username = res.data.data.username;
        this.user.avatar = res.data.data.avatar;
        this.user.bio = res.data.data.bio;
      });
    }
  },
  created() {
    this.fetchRequestedUser();
  }
};
</script>

<style lang="scss" scoped>
aside {
  top: 0;
  position: sticky;
  .aside-wrapper {
    width: auto;
    margin: 2rem;
    .user {
      height: 10rem;
      .info {
        display: flex;
        align-items: center;
        img {
          border-radius: 4px;
        }
        span {
          margin-left: 0.5rem;
          font-size: 1.4em;
          font-weight: 600;
        }
      }
      .about {
        margin-top: 1rem;
      }
    }
    .contents {
      display: flex;
      flex-direction: column;
      justify-content: center;
      .maker {
        margin-bottom: 0.75rem;
        border: 1px dashed #bbb;
        border-radius: 8px;
        label {
          display: flex;
          align-items: center;
          text-align: center;
          justify-content: center;
          width: auto;
          height: 11rem;
          cursor: pointer;
          font-size: 2em;
        }
        input[type="file"] {
          display: none;
        }
      }
      .videos-wrapper {
        height: 15.75rem;
        overflow-y: scroll;
        scrollbar-width: none;
        .video {
          margin-bottom: 0.5rem;
          width: auto;
          height: 7rem;
          border: 1px solid #222;
          border-radius: 4px;
        }
        .video:nth-last-of-type(1) {
          margin-bottom: 1rem !important;
        }
      }
    }
  }
}
</style>
