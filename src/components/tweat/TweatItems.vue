<template>
  <div class="tweat">
    <div class="user-avatar">
      <div class="user-wrapper">
        <div class="img">
          <img
            :src="authorAvatar"
            alt=""
            width="30"
            height="30"
          />
        </div>
        <span class="author font-medium">{{ author }}</span>
      </div>
      <span class="more"><FeatherMoreHorizontal /></span>
    </div>
    <div class="content">
      <div class="content-body">
        {{ tweat }}
      </div>
      <div v-if="pictureUrl" class="content-image">
        <img :src="pictureUrl" alt="" srcset="">
      </div>
      <div class="content-repr">
        <div class="comments">
          <div class="inner">
            <FeatherComments />
            <span class="comment-count"></span>
          </div>
        </div>
        <div class="like">
          <div class="inner">
            <FeatherHeart />
            <span class="likes-count"></span>
          </div>
        </div>
        <div class="share">
          <div class="inner">
            <FeatherShare />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import FeatherMoreHorizontal from '../svgs/FeatherMoreHorizontal'
import FeatherComments from '../svgs/FeatherComments'
import FeatherHeart from '../svgs/FeatherHeart'
import FeatherShare from '../svgs/FeatherShare'

export default {
  name: "TweatItems",
  components: {
    FeatherMoreHorizontal, FeatherComments, FeatherHeart, FeatherShare
  },
  props: {
    author: {
      type: String,
      required: true,
    },
    tweat: {
      type: String,
      required: true,
    },
    authorAvatar: {
      type: String,
      required: true,
    },
    pictureUrl: {
      type: String,
      required: true,
    },
    createdAt: {
      type: String,
      required: true,
    },
  },
  methods: {
    favoriteTweat(id) {
      this.$emit("favorite", id);
    },
  },
};
</script>

<style lang="scss" scoped>
.tweat {
  cursor: pointer;
  padding: 0.5rem 1.25rem 1rem 1.25rem;
  border: 1px solid #222;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  word-break: break-all;
  &:not(:first-of-type) {
    margin-top: 1.5rem;
  }
  &:hover {
    background-color: rgb(19, 19, 19);
  }
}

.tweat {
  font-family: "Roboto", sans-serif;
  .user-avatar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 0.5rem;
    color: #ccc;
    .user-wrapper {
      display: flex;
      align-items: center;
      img {
        width: 30px;
        height: 30px;
        border-radius: 4px;
      }
      .author {
        margin-left: 0.75rem;
        &:hover {
          text-decoration: underline;
        }
      }
    }
    .more {
      padding: 0.25rem;
      border-radius: 20px;
      &:hover {
        background-color: rgb(52, 211, 153, 0.1);
      }
    }
    svg {
      stroke: #34D399;
      cursor: pointer;
    }
  }
  .content {
    color: #ccc;
    .content-image {
      // min-width : 504px;
      // min-height: 433px;
      max-width : 512px;
      max-height: 433px;
      overflow: hidden;
      position: relative;

      margin: 1rem 0 0.25rem 0;
      background-color: #000;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 4px;
      img {
        border-radius: 4px;
      }
    }
    .content-body {
      font-size: 0.925em;
      margin-top: 1rem;
    }
    .content-repr {
      display: flex;
      margin-top: 1rem;
      svg {
        transform: scale(0.9);
        stroke: rgb(148, 148, 148);
      }
      div {
        width: 6rem;
        cursor: pointer;
        display: inline-block;
        span {
          margin-left: 0.5rem;
          font-size: 0.75em;
        }
        .inner {
          display: flex;
          align-items: center;
        }
      }
      div:not(:last-child) {
        margin-right: 6rem;
      }
      .comments:hover {
        color: #34D399;
        svg {
          stroke: #34D399;
        }
      }
      .like:hover {
        color: crimson;
        svg {
          stroke: crimson;
        }
      }
      .share:hover {
        color: #34D399;
        svg {
          stroke: #34D399;
        }
      }
    }
  }
}
</style>
