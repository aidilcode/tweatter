<template>
  <Comment
    v-if="commenting"
    :id="tweatId"
    :author="repliedTo"
    :tweat="tweatContent"
    @closeComment="closedComment"
  />
  <div class="tweatters-wrapper">
    <div class="tweat" v-for="tweat in state.tweats" :key="tweat.id">
      <router-link
        :to="{
          name: 'TweatDetail',
          params: { username: tweat.author.username, id: tweat.id },
        }"
        class="tweat-link"
      >
        <div class="tweat-info">
          <router-link
            :to="{
              name: 'UserProfile',
              params: { username: tweat.author.username },
            }"
          >
            <img :src="tweat.author.avatar_url" alt="" width="30" height="30" />
            <span class="tweat-username">{{ tweat.author.username }}</span>
          </router-link>
          <object
            :id="tweat.id"
            @click="moreOption($event, tweat.id)"
            class="dropdown"
            style="float: right"
          >
            <button class="dropbtn" :id="'dropbtn-' + tweat.id">
              <FeatherMoreHorizontal />
            </button>
            <div class="dropdown-content" :id="'more-' + tweat.id">
              <div>archive</div>
              <div>report</div>
              <div
                class="delete-tweat"
                v-if="requestUser == state.user.username"
                @click="deleteTweat(tweat.id)"
              >
                delete
              </div>
            </div>
          </object>
        </div>
        <div class="tweat-content">
          <div>
            {{ tweat.tweat }}
          </div>
          <div v-if="tweat.picture_url" class="image">
            <img :src="tweat.picture_url" alt="" srcset="" />
          </div>
        </div>
        <div class="tweat-repr">
          <div class="tweat-comment">
            <span
              ><FeatherComments
                @click="
                  commentTweat(
                    $event,
                    tweat.author.username,
                    tweat.tweat,
                    tweat.id
                  )
                "
            /></span>
            <div :id="'comment-' + tweat.id">
              {{ format(tweat.comments_count) }}
            </div>
          </div>
          <div class="tweat-like">
            <span
              :id="'isliked-' + tweat.id"
              :class="{ liked: tweat.likes.includes(state.user.username) }"
              @click="likeTweat($event, tweat.id)"
              ><FeatherHeart
            /></span>
            <div :id="'like-' + tweat.id">{{ format(tweat.likes_count) }}</div>
          </div>
          <div class="tweat-share">
            <span><FeatherShare /></span>
            <div></div>
          </div>
          <div class="tweat-hash">
            <span><FeatherHash /></span>
            <div></div>
          </div>
        </div>
      </router-link>
      <div v-if="loadThreadComment && tweat.comments.length > 0">
        <div class="user-replies">
          <div
            class="comment"
            v-for="comment in tweat.comments"
            :key="comment.id"
          >
            <div class="comment-info">
              <router-link
                :to="{
                  name: 'UserProfile',
                  params: { username: comment.users__username },
                }"
              >
                <img :src="comment.users__avatar_url" />
              </router-link>
            </div>
            <div class="comment-content">
              <p>
                <router-link
                  :to="{
                    name: 'UserProfile',
                    params: { username: comment.users__username },
                  }"
                  class="username"
                  >{{ comment.users__username }}</router-link
                >
                <small>replying to @{{ tweat.author.username }}</small>
              </p>
              <p class="content">{{ comment.content }}</p>
            </div>
          </div>
        </div>
        <div v-if="!detailTweat" class="continue-thread">
          <router-link
            :to="{
              name: 'TweatDetail',
              params: { username: tweat.author.username, id: tweat.id },
            }"
            >continue thread</router-link
          >
        </div>
      </div>
      <div v-else class="border-bottom"></div>
    </div>
  </div>
  <div v-if="state.loading" class="tweat-skeleton">
    <div class="skeleton-wrap">
      <div class="skeleton-info">
        <div class="skeleton-img"></div>
        <span></span>
      </div>
      <div class="skeleton-content">
        <div class="skeleton-body">
          <div class="bar-1"></div>
          <div class="bar-2"></div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="!state.status.next && !detailTweat" class="bottom-end">
    {{ state.status.mssg }} <span><a href="">&#128079;</a></span>
  </div>
</template>

<script>
import { reactive } from "vue";
import axiosInstance from "@/plugin/axios";

import format from "@/plugin/format";
import fetchMoreTweat from "@/plugin/fetchMoreTweat";

import FeatherComments from "@/components/icons/FeatherComments";
import FeatherHeart from "@/components/icons/FeatherHeart";
import FeatherShare from "@/components/icons/FeatherShare";
import FeatherHash from "@/components/icons/FeatherHash";
import FeatherMoreHorizontal from "@/components/icons/FeatherMoreHorizontal";

import Comment from "@/components/Comment";

export default {
  name: "TweatItems",
  components: {
    FeatherComments,
    FeatherHeart,
    FeatherShare,
    FeatherHash,
    FeatherMoreHorizontal,
    Comment,
  },
  props: {
    tweatUrl: {
      type: String,
      required: true,
    },
    requestUser: {
      type: String,
      required: false,
    },
    loadThreadComment: {
      type: Boolean,
      requried: false,
    },
    fetchAgain: {
      type: Boolean,
      required: false,
    },
    detailTweat: {
      type: Boolean,
      required: false,
    },
  },
  data() {
    return {
      commenting: false,
      repliedTo: "",
      tweatContent: "",
      tweatId: "",
    };
  },
  mixins: [format],
  setup() {
    // state
    const state = reactive({
      user: {
        username: localStorage.getItem("username"),
        avatar: localStorage.getItem("avatar_url"),
      },
      status: {
        pause: Date.now() + 1000,
        next: "next",
        mssg: "Looks like you've reach the end of the page.",
      },
      fetchUrl: "",
      access: localStorage.getItem("access_token"),
      tweats: [],
      loading: false,
    });

    // methods
    async function fetchTweats() {
      state.loading = true;
      if (!state.fetchUrl) state.fetchUrl = this.tweatUrl;

      await axiosInstance({
        method: "GET",
        url: state.fetchUrl,
        headers: {
          Authorization: `Bearer ${state.access}`,
          "Content-Type": "application/json;charset=UTF-8",
        },
      })
        .then((res) => {
          state.status.next = res.data.next;
          state.tweats = res.data.results;
          state.loading = false;
        })
        .catch(() => {
          state.loading = false;
          state.status.next = null;
          state.status.mssg = "Something is wrong, try to refresh your page.";
        });
    }

    async function likeTweat(event, id) {
      event.cancelBubble = true;
      if (event.stopPropagation) {
        event.stopPropagation();
        event.preventDefault();
      }

      var counter = document.getElementById(`like-${id}`);
      var likedTw = document.getElementById(`isliked-${id}`);
      var likeUrl = "tweat/like/" + id;
      var methods = "GET";
      var numdisk, numlike;

      // dislike
      if (likedTw.classList.contains("liked")) {
        likeUrl = "tweat/dislike/" + id;
        methods = "DELETE";

        numdisk = Number(counter.innerText) - 1;
        if (numdisk == 0) numdisk = "";
        counter.innerText = numdisk;
      }

      // like
      if (!likedTw.classList.contains("liked")) {
        if (counter.innerText == "") numlike = 1;
        else numlike = Number(counter.innerText) + 1;

        counter.innerText = numlike;
      }

      likedTw.classList.toggle("liked");
      await axiosInstance({
        method: methods,
        url: likeUrl,
        headers: {
          Authorization: `Bearer ${state.access}`,
          "Content-Type": "application/json;charset=UTF-8",
        },
      }).catch(() => alert("Something went wrong when doing the action"));
    }

    async function deleteTweat(id) {
      const response = await axiosInstance({
        method: "DELETE",
        url: "tweat/" + id,
        headers: {
          Authorization: `Bearer ${state.access}`,
          "Content-Type": "application/json;charset=UTF-8",
        },
      });

      if (response.status == 400)
        alert("Something went wrong when doing the action.");
      if (response.status == 401)
        alert("You are not unauthorized to use this action.");
      if (response.status == 204) {
        console.log(state.fetchUrl);
        await this.fetchTweats(state.fetchUrl);
      }
    }

    async function loadMoreTweat() {
      this.state.loading = true;
      const response = await this.fetchMoreTweat(
        this.state.status.next,
        this.state.status.pause
      );
      this.state.loading = false;
      if (!response || response.status == 400) return;

      this.state.status.pause = Date.now() + 1000; // 1 seconds
      this.state.tweats.push(...response.data.results);
      this.state.status.next = response.data.next;
    }

    return {
      state,
      fetchTweats,
      likeTweat,
      loadMoreTweat,
      deleteTweat,
    };
  },
  watch: {
    fetchAgain: function () {
      if (this.fetchAgain) {
        this.fetchTweats();
        this.$emit("fetchedNewTweats");
      }
    },
  },
  methods: {
    format,
    fetchMoreTweat,
    moreOption(event, id) {
      event.cancelBubble = true;
      if (event.stopPropagation) {
        event.stopPropagation();
        event.preventDefault();
      }

      const more = document.getElementById(`more-${id}`);
      const drop = document.getElementById(`dropbtn-${id}`);
      more.classList.toggle("block");
      drop.classList.toggle("btn-active");
    },
    commentTweat(event, repliedTo, tweatContent, tweatId) {
      event.cancelBubble = true;
      if (event.stopPropagation) {
        event.stopPropagation();
        event.preventDefault();
      }

      var commentCount = document.getElementById(`comment-${tweatId}`)
        .innerText;

      this.repliedTo = repliedTo;
      this.tweatContent = tweatContent;
      this.tweatId = tweatId;
      this.commenting = true;
      this.counts = commentCount;
    },
    closedComment(replied) {
      if (replied) {
        var counts = document.getElementById("comment-" + this.tweatId);
        console.info(counts.innerText == "");
        counts.innerText =
          counts.innerText == "" ? 1 : Number(counts.innerText) + 1;
      }

      this.commenting = false;
      this.repliedTo = "";
      this.tweatContent = "";
      this.tweatId = "";
    },
  },
  async created() {
    await this.fetchTweats();
  },
  mounted() {
    let vm = this;
    window.addEventListener("scroll", function () {
      let top = this.document.documentElement.scrollTop;
      let client = this.document.documentElement.clientHeight;
      let height = this.document.documentElement.scrollHeight;

      if (top + client == height) {
        vm.loadMoreTweat();
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.tweat {
  margin-top: 1rem;
  cursor: pointer;
  border-top: 1px solid #222;
  transition: 0.2s ease-in-out;
  background: rgb(18, 18, 18);
  .tweat-link {
    display: flex;
    flex-direction: column;
    padding: 1.5rem 1.5rem 1rem 1.5rem;
  }
  .tweat-info {
    .tweat-username:hover {
      text-decoration: underline;
    }
    a {
      display: inline-flex;
      align-items: center;
    }
    img {
      border-radius: 4px;
    }
    span {
      margin-left: 0.5rem;
      font-size: 1.1em;
      font-weight: 600;
    }
    .btn-active {
      svg {
        stroke: #34d399 !important;
      }
      background-color: rgb(52, 211, 153, 0.1) !important;
    }
    .dropbtn {
      padding: 0.25rem;
      border-radius: 20px;
      border: none;
      cursor: pointer;
      &:hover {
        svg {
          stroke: #34d399;
        }
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
      .delete-tweat:hover {
        color: crimson !important;
        background-color: rgba(220, 20, 60, 0.1);
      }
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
  .tweat-content {
    div {
      margin-top: 0.75rem;
      font-size: 0.955em;
    }
    .image {
      max-height: 500px !important;
      overflow: hidden;
      border-radius: 4px;
    }
  }
  .tweat-repr {
    margin-top: 0.75rem;
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    div {
      display: flex;
      align-items: center;
      span {
        padding: 0.5rem;
        border-radius: 50%;
        transition: 0.2s ease-in-out;
        svg {
          transform: scale(0.8);
        }
        &:hover {
          transition: 0.2s ease-in-out;
          background: rgba(52, 211, 153, 0.1);
          svg {
            stroke: #34d399;
          }
        }
      }
      div {
        margin-left: 0.25rem;
      }
      span:hover + div {
        color: #34d399;
      }
    }
    .tweat-like {
      .liked {
        svg {
          fill: crimson;
          stroke: crimson;
        }
      }
      .liked + div {
        color: crimson;
      }
      span:hover {
        background-color: rgba(220, 20, 60, 0.1);
        svg {
          stroke: crimson;
        }
      }
      span:hover + div {
        color: crimson;
      }
    }
    .tweat-share {
      span:hover {
        background-color: rgba(91, 91, 241, 0.1);
        svg {
          stroke: rgb(91, 91, 241);
          transition: 0.2s ease-in-out;
        }
      }
      span:hover + div {
        color: rgb(91, 91, 241);
      }
    }
  }
  &:hover {
    transition: 0.2s ease-in-out;
    background-color: rgb(15, 15, 15);
  }
}
.user-replies {
  border-top: 1px solid #222;
  .comment {
    padding: 1rem 1.5rem 1rem 1.5rem;
    display: flex;
    .comment-info {
      img {
        border-radius: 4px;
        width: 23.5px;
        height: 23.5px;
      }
    }
    .comment-content {
      margin-left: 0.5rem;
      .username {
        color: #34d399;
        &:hover {
          text-decoration: underline;
        }
      }
      small {
        margin-left: 0.5rem;
        color: #bbb;
      }
    }
    &:hover {
      background-color: rgb(20, 20, 20);
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
    }
  }
}
.continue-thread {
  border-bottom: 1px solid #222;
  border-top: 1px solid #222;
  display: flex;
  a {
    padding: 1rem;
    width: 100%;
    display: inline;
    &:hover {
      color: #34d399;
      background: rgb(20, 20, 20);
    }
  }
}
.border-bottom {
  border-bottom: 1px solid #222;
}
.tweat-skeleton {
  margin: 1rem 0 3rem 0;
  padding: 1.5rem 1.5rem 1.75rem 1.5rem;
  cursor: pointer;
  border-top: 1px solid #222;
  border-bottom: 1px solid #222;
  transition: 0.2s ease-in-out;
  animation: backgroundPulse 1s ease-out;
  animation-iteration-count: infinite;
  @keyframes backgroundPulse {
    0% {
      opacity: 0.9;
    }
    25% {
      opacity: 0.7;
    }
    50% {
      opacity: 0.5;
    }
    75% {
      opacity: 0.7;
    }
    100% {
      opacity: 0.9;
    }
  }
  .skeleton-info {
    display: flex;
    align-items: center;
    .skeleton-img {
      width: 30px;
      height: 30px;
      background: #222;
      border-radius: 4px;
    }
    span {
      margin-left: 0.5rem;
      width: 80px;
      height: 13px;
      background: #222;
      border-radius: 2px;
    }
  }
  .skeleton-content {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    .bar-1 {
      background: #222;
      border-radius: 3px;
      width: 26rem !important;
      height: 13px;
    }
    .bar-2 {
      margin-top: 0.75rem;
      background: #222;
      border-radius: 3px;
      width: 22rem !important;
      height: 13px;
    }
  }
}
.bottom-end {
  margin: 2rem 0 1rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: context-menu;
}
</style>
