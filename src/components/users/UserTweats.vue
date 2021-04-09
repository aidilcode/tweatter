<template>
  <LoadingSpinner v-if="!state.reciveData" class="spin-loader" />
  <div class="tweat" v-for="tweat in state.userTweats" :key="tweat.id">
    <router-link
      :to="{
        name: 'TweatDetail',
        params: { username: tweat.author.username, id: tweat.id },
      }"
      class="content"
    >
      <div class="author-wrapper">
        <div class="info">
          <div class="img">
            <img :src="tweat.author.avatar_url" alt="" width="30" height="30" />
          </div>
          <span class="author font-medium">{{ tweat.author.username }}</span>
        </div>
        <object
          v-if="state.current == tweat.author.username"
          class="dropdown"
          @click="moreOption($event, tweat.id)"
          :id="tweat.id"
          style="float: right"
        >
          <button class="dropbtn">
            <FeatherMoreHorizontal />
          </button>
          <div class="dropdown-content" :id="'ddb-' + tweat.id">
            <div @click="deleteTweat(tweat.id)">delete</div>
            <div>archive</div>
          </div>
        </object>
      </div>
      <div class="content-body">
        {{ tweat.tweat }}
      </div>
      <div v-if="tweat.picture_url" class="content-image">
        <img :src="tweat.picture_url" alt="" srcset="" />
      </div>
    </router-link>
    <div class="content-repr">
      <div class="comments">
        <FeatherComments />
      </div>
      <div class="likes">
        <FeatherHeart
          :id="'isliked-' + tweat.id"
          :class="{ liked: tweat.likes.includes(state.current) }"
          @click="likeTweat(tweat.id)"
        />
        <span :id="'like-' + tweat.id">{{ format(tweat.likes_count) }}</span>
      </div>
      <div class="shares">
        <FeatherShare />
      </div>
    </div>
  </div>
  <div v-if="state.endOf.state" class="end-of">
    {{ state.endOf.msg }}
  </div>
</template>

<script>
import { reactive } from "vue";
import { useRoute } from "vue-router";
import axiosInstance from "@/plugin/axios";

import LoadingSpinner from "@/components/LoadingSpinner";
import FeatherMoreHorizontal from "@/components/icons/FeatherMoreHorizontal";
import FeatherComments from "@/components/icons/FeatherComments";
import FeatherHeart from "@/components/icons/FeatherHeart";
import FeatherShare from "@/components/icons/FeatherShare";

export default {
  name: "TweatItems",
  components: {
    FeatherMoreHorizontal,
    FeatherComments,
    FeatherHeart,
    FeatherShare,
    LoadingSpinner,
  },
  setup() {
    const route = useRoute();
    const requestUser = route.params.username;

    const state = reactive({
      userTweats: [],
      reciveData: false,
      next: "",
      endOf: {
        state: false,
        msg: "",
      },
      current: localStorage.getItem("username"),
      breakLoad: 0,
    });

    async function fetchUserTweats(username = null) {
      let access = localStorage.getItem("access_token");
      let unames = username ? username : requestUser;

      const res = await axiosInstance({
        method: "GET",
        url: `${unames}/tweats`,
        headers: {
          Authorization: `Bearer ${access}`,
          "Content-Type": "application/json;charset=UTF-8",
        },
      }).catch((err) => {
        console.error(err);
      });

      if (typeof res === "object") {
        state.userTweats = res.data.results;
        state.next = res.data.next;
        state.reciveData = true;
        return;
      }

      alert("Something is wrong, try to reload the page.");
    }

    return {
      state,
      fetchUserTweats,
    };
  },
  async created() {
    await this.fetchUserTweats();
  },
  methods: {
    nround(n, precision) {
      var prec = Math.pow(10, precision);
      return Math.round(n * prec) / prec;
    },
    format(n) {
      if (n == "") return "";
      var abbrev = "kmb";
      var base = Math.floor(Math.log(Math.abs(n)) / Math.log(1000));
      var suffix = abbrev[Math.min(2, base - 1)];
      base = abbrev.indexOf(suffix) + 1;
      return suffix
        ? this.nround(n / Math.pow(1000, base), 2) + suffix
        : "" + n;
    },
    moreOption(event, id) {
      event.cancelBubble = true;
      if (event.stopPropagation) {
        console.log("cancelled");
        event.stopPropagation();
        event.preventDefault();
      }

      const DDbuttons = document.getElementById(`ddb-${id}`);
      DDbuttons.classList.toggle("block");
    },
    async likeTweat(id) {
      let access = localStorage.getItem("access_token");
      var elm = document.getElementById(`like-${id}`);
      var ilm = document.getElementById(`isliked-${id}`);
      var url = `tweat/like/${id}`; // default like url
      var numdis;
      var numlik;

      if (ilm.classList.contains("liked")) {
        url = `tweat/dislike/${id}`;
        ilm.classList.remove("liked");

        numdis = Number(elm.innerText) - 1;
        if (numdis == 0) numdis = "";
        elm.innerText = numdis;
      } else {
        ilm.classList.add("liked");

        if (numlik == "") {
          numlik = 1;
        } else {
          numlik = Number(elm.innerText) + 1;
        }
        elm.innerText = numlik;
      }

      await axiosInstance({
        method: "GET",
        url: url,
        headers: {
          Authorization: `Bearer ${access}`,
          "Content-Type": "application/json;charset=UTF-8",
        },
      }).catch((err) => console.error(err));
    },
    loadMore: function () {
      if (this.state.next === null) {
        this.state.endOf.state = true;
        this.state.endOf.msg = "No more content to show";
        return;
      }

      if (this.state.breakLoad <= Date.now()) {
        axiosInstance({
          method: "GET",
          url: this.state.next,
        }).then((res) => {
          this.state.breakLoad = Date.now() + 1000; // 1seconds
          this.state.userTweats.push(...res.data.results);
          this.state.next = res.data.next;
        });
      }
    },
    async deleteTweat(id) {
      let access = localStorage.getItem("access_token");

      await axiosInstance({
        method: "DELETE",
        url: `tweat/${id}`,
        headers: {
          Authorization: `Bearer ${access}`,
          "Content-Type": "application/json;charset=UTF-8",
        },
      }).catch((err) => {
        if (err.response.status == 401) {
          alert("You are not unauthorized to use this action.");
        }
        if (err.response.status == 400) {
          console.error(err);
        }
      });

      await this.fetchUserTweats();
    },
  },
  mounted() {
    let vm = this;
    window.addEventListener("scroll", function () {
      let scTop = this.document.documentElement.scrollTop;
      let scHeight = this.document.documentElement.scrollHeight;
      let scClient = this.document.documentElement.clientHeight;

      if (scTop + scClient == scHeight && !vm.state.endOf.msg) {
        vm.loadMore();
      }
    });
  },
  watch: {
    $route(to) {
      this.fetchUserTweats(to.params.username);
    },
  },
};
</script>

<style lang="scss" scoped>
.spin-loader {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}
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
      &:hover {
        background-color: rgb(52, 211, 153, 0.1);
      }
    }
    .dropdown {
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
  }
  .content-repr {
    margin-top: 1rem;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    div {
      display: flex;
      .liked {
        fill: crimson;
        stroke: crimson;
      }
      .liked + span {
        color: crimson;
      }
      svg {
        stroke: rgb(60, 60, 60);
        transition: 0.2s ease-in-out;
        transform: scale(1.5);
        padding: 0.31rem;
        border-radius: 100%;
      }
      span {
        color: rgb(60, 60, 60);
        transition: 0.2s ease-in-out;
        margin-left: 0.65rem;
      }
    }
    .comments {
      svg:hover {
        stroke: #34d399;
        transition: 0.2s ease-in-out;
        background-color: rgb(52, 211, 153, 0.1);
      }
      svg:hover + span {
        transition: 0.2s ease-in-out;
        color: #34d399;
      }
    }
    .likes {
      svg:hover {
        stroke: crimson;
        transition: 0.2s ease-in-out;
        background-color: rgba(220, 20, 60, 0.1);
      }
      svg:hover + span {
        transition: 0.2s ease-in-out;
        color: crimson;
      }
    }
    .shares {
      svg:hover {
        stroke: #34d399;
        transition: 0.2s ease-in-out;
        background-color: rgb(52, 211, 153, 0.1);
      }
      svg:hover + span {
        transition: 0.2s ease-in-out;
        color: #34d399;
      }
    }
  }
}
.end-of {
  color: #fff;
  display: flex;
  justify-content: center;
  margin-top: 3rem;
  margin-bottom: 2rem;
}
</style>
