<template>
  <div class="tweat-detail">
    <div class="top-return">
      <div class="return-back">
        <router-link to="/">
          <FeatherArrowLeft />
        </router-link>
      </div>
      <p>Tweat</p>
    </div>
    <LoadingSpinner v-if="!state.reciveData" class="spin-loader" />
    <div class="tweat" v-else>
      <div class="author-wrapper">
        <div class="info">
          <div class="img">
            <img :src="state.tweat.author__avatar_url" alt="" width="30" height="30" />
          </div>
          <router-link
            :to="{ name: 'UserProfile', params: { username: state.tweat.author__username } }"
            class="author font-medium"
            >{{ state.tweat.author__username }}</router-link
          >
        </div>
        <div
          class="dropdown"
          @click="moreOption(state.tweat.id)"
          :id="state.tweat.id"
          style="float: right"
        >
          <button class="dropbtn">
            <FeatherMoreHorizontal />
          </button>
          <div class="dropdown-content" :id="'ddb-' + state.tweat.id">
            <div>report</div>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="content-body">
          {{ state.tweat.tweat }}
        </div>
        <div v-if="state.tweat.picture_url" class="content-image">
          <img :src="state.tweat.picture_url" alt="" srcset="" />
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
  </div>
</template>

<script>
import { reactive } from 'vue';
import { useRoute } from 'vue-router'
import axiosInstance from "@/plugin/axios";

import LoadingSpinner from "@/components/LoadingSpinner";
import FeatherMoreHorizontal from "@/components/icons/FeatherMoreHorizontal";
import FeatherComments from "@/components/icons/FeatherComments";
import FeatherHeart from "@/components/icons/FeatherHeart";
import FeatherShare from "@/components/icons/FeatherShare";
import FeatherArrowLeft from "@/components/icons/FeatherArrowLeft";


export default {
  name: "TweatDetail",
  components: {
    LoadingSpinner,
    FeatherMoreHorizontal,
    FeatherComments,
    FeatherHeart,
    FeatherShare,
    FeatherArrowLeft,
  },
  data() {
    return {
      prevRoute: null
    }
  },
  setup() {
    const route = useRoute()
    const requestIdis = route.params.id

    const state = reactive({
      tweat: {},
      reciveData: false,
    })

    async function tweatDetail() {
      const detail = await axiosInstance({
        method: "GET",
        url: `tweat/${requestIdis}`,
      }).catch((err) => console.error(err));

      // console.log(detail.data.data)
      state.tweat = detail.data.data[0];
      state.reciveData = true;
    }

    return {
      state,
      tweatDetail
    }
  },
  methods: {
    moreOption(id) {
      const more = document.getElementById(`ddb-${id}`);
      more.classList.toggle("block");
    },
  },
  async created() {
    await this.tweatDetail();
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.prevRoute = from
    })
  },
}
</script>

<style lang="scss" scoped>
.spin-loader {
  display: flex;
  justify-content: center;
  margin-top: 50%;
}
.tweat-detail {
  grid-column: span 6;
  margin-bottom: 2rem;
  padding: 0 4rem 0 4rem;
  .top-return {
    z-index: 3;
    top: 0;
    background-color: #111;
    position: sticky;
    display: flex;
    align-items: center;
    padding: 1rem;
    border: 1px solid #222;
    border-top: none;
    .return-back {
      cursor: pointer;
      border-radius: 50%;
      padding: 0.5rem;
      display: inline-block;
      transition: 0.2s ease-in-out;
      svg {
        transition: 0.2s ease-in-out;
        stroke: #fff;
      }
      &:hover {
        transition: 0.2s ease-in-out;
        background-color: rgb(52, 211, 153, 0.1);
        svg {
          transition: 0.2s ease-in-out;
          stroke: #34d399;
        }
      }
    }
    p {
      cursor: pointer;
      margin-left: 1rem;
      color: #fff;
      font-weight: 600;
      font-size: 1.3em;
    }
  }
  .tweat {
    cursor: pointer;
    padding: 0.5rem 1.25rem 1rem 1.25rem;
    border: 1px solid #222;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
    border-radius: 4px;
    word-break: break-all;
    transition: 0.2s ease-in-out;
    &:not(:first-child) {
      margin-top: 1.5rem;
    }
    &:hover {
      transition: 0.2s ease-in-out;
      background-color: rgb(19, 19, 19);
    }
  }
  .tweat {
    font-family: "Roboto", sans-serif;
    .author-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 0.5rem;
      color: #ccc;
      .info {
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
      svg {
        stroke: #34d399;
        cursor: pointer;
      }
      .dropbtn {
        padding: 0.25rem;
        border-radius: 20px;
        border: none;
        cursor: pointer;
        transition: 0.2s ease-in-out;
        &:hover {
          transition: 0.2s ease-in-out;
          background-color: rgb(52, 211, 153, 0.1);
        }
      }
      .dropdown {
        z-index: 2 !important;
        position: relative;
        display: inline-block;
      }
      .block {
        display: block !important;
      }
      .dropdown-content {
        border-radius: 3px;
        display: none;
        position: absolute;
        top: 1.5rem;
        right: 0;
        background-color: #111;
        border: 1px solid #222;
        min-width: 160px;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
        z-index: 99;
        div {
          color: #ccc;
          padding: 12px 20px;
          text-decoration: none;
          display: block;
          &:hover {
            background-color: rgb(24, 24, 24);
          }
        }
      }
    }
    .content {
      color: #ccc;
      .content-image {
        // min-width : 504px;
        // min-height: 433px;
        max-width: 552px;
        max-height: 493px;
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
          color: #34d399;
          svg {
            stroke: #34d399;
          }
        }
        .like:hover {
          color: crimson;
          svg {
            stroke: crimson;
          }
        }
        .share:hover {
          color: #34d399;
          svg {
            stroke: #34d399;
          }
        }
      }
    }
  }
}
</style>

