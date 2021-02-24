<template>
  <div>
    <div class="user-content">
      <router-link
        :to="{ name: 'UserProfile', params: { username: user.username } }"
        class="inner"
      >
        <div class="avatar">
          <img
            src="../../assets/images/solid-m.png"
            alt=""
            srcset=""
            width="30"
            height="30"
          />
        </div>
        <span class="font-semibold">jirenmaa</span>
      </router-link>
    </div>
    <div class="create-content--video">
      <div class="box-input-video">
        <label for="video">
          <span>+</span>
        </label>
        <input type="file" name="video" id="video" class="hidden">
      </div>
    </div>
    <div class="top-rated-video">
      <div class="videos">
        <div class="box-video video-1">
          <span>vid 1</span>
        </div>
        <div class="box-video video-2">
          <span>vid 2</span>
        </div>
        <div class="box-video video-3">
          <span>vid 3</span>
        </div>
        <div class="box-video video-4">
          <span>vid 4</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeaderContent",
  props: {
    user: Object,
  },
};
</script>

<style lang="scss" scoped>
.user-content {
  height: 7rem;
  padding-top: 2rem;
  .inner {
    padding: 1rem;
    display: flex;
    img {
      width: 30px;
      height: 30px;
      border-radius: 4px;
    }
    span {
      font-size: 1.1em;
      color: #ccc;
      margin-left: 0.75rem;
    }
  }
}
.create-content--video {
  display: flex;
  justify-content: center;
  height: 10rem;
  .box-input-video {
    border: 1px solid #aaa;
    border-radius: 20px;
    border-style: dashed;
    label {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 10rem;
      height: 10rem;
      span {
        font-size: 2em;
        color: rgb(170, 170, 170);
      }
      &:hover {
        cursor: pointer;
        span {
          color: #ccc;
        }
      }
    }
  }
}
.top-rated-video {
  height: 25rem;
  h2 {
    color: #ccc;
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
  }
  .videos {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 2px solid #222;
    height: 24rem;
    display: inline-block;
    overflow: scroll;
    overflow-x: hidden !important;
    scrollbar-width: none;
    margin-left: 1rem;
    margin-right: 1rem;
    .box-video:not(:first-child) {
      margin-top: 1rem;
    }
    .box-video:last-child {
      margin-bottom: 1rem;
    }
    .box-video {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 10rem;
      height: 7rem;
      // border: 1px solid #222;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
      border-radius: 20px;
      span {
        font-size: 1.25em;
        color: #bbb;
      }
    }
    .video-1 {
      background: url("../../assets/images/r-pexels-photo-4552444.jpg")
        no-repeat no-repeat 0% 0%;
    }
    .video-2 {
      background: url("../../assets/images/r-pexels-cole-keister-5352850.jpg")
        no-repeat no-repeat 0% 0%;
    }
    .video-3 {
      background: url("../../assets/images/r-pexels-anni-roenkae-2457317.jpg")
        no-repeat no-repeat 0% 0%;
    }
    .video-4 {
      background: url("../../assets/images/r-pexels-photo-4552444.jpg")
        no-repeat no-repeat 0% 0%;
    }
  }
}
</style>
