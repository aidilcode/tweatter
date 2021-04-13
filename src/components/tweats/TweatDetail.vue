<template>
  <section>
    <Comment
      v-if="commenting"
      :id="tweatId"
      :author="repliedTo"
      :tweat="tweatContent"
      @closeComment="closedComment"
    />
    <div class="section-top">
      <div class="top-return">
        <span>
          <router-link to="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-arrow-left"
              data-v-01285034=""
            >
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </router-link>
        </span>
        <h2>
          <router-link to="/">Tweat</router-link>
        </h2>
      </div>
      <div class="top-left"><h2>T</h2></div>
    </div>
    <div class="tweatters-wrapper">
      <div class="tweat" v-for="tweat in state.tweats" :key="tweat.id">
        <div class="tweat-link">
          <div class="tweat-info">
            <router-link
              :to="{
                name: 'UserProfile',
                params: { username: tweat.author.username },
              }"
            >
              <img
                :src="tweat.author.avatar_url"
                alt=""
                width="30"
                height="30"
              />
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
                  v-if="tweat.author.username == state.user.username"
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
              <div :id="'like-' + tweat.id">
                {{ format(tweat.likes_count) }}
              </div>
            </div>
            <div class="tweat-share">
              <span><FeatherShare /></span>
              <div>1.7k</div>
            </div>
            <div class="tweat-hash">
              <span><FeatherHash /></span>
              <div>400</div>
            </div>
          </div>
        </div>
        <div v-if="tweat.comments.length > 1">
          <div class="user-replies">
            <div
              class="comment"
              v-for="comment in tweat.comments"
              :key="comment.id"
            >
              <div class="comment-info">
                <router-link :to="comment.users__username">
                  <img :src="comment.users__avatar_url" />
                </router-link>
              </div>
              <div class="comment-content">
                <p>
                  <router-link :to="comment.users__username" class="username">{{
                    comment.users__username
                  }}</router-link>
                  <small>replying to @{{ tweat.author.username }}</small>
                </p>
                <p class="content">{{ comment.content }}</p>
              </div>
            </div>
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
  </section>
</template>

<script>
import { reactive } from "vue";
import { useRoute } from "vue-router";
import axiosInstance from "@/plugin/axios";

import format from "@/plugin/format";

import FeatherComments from "@/components/icons/FeatherComments";
import FeatherHeart from "@/components/icons/FeatherHeart";
import FeatherShare from "@/components/icons/FeatherShare";
import FeatherHash from "@/components/icons/FeatherHash";
import FeatherMoreHorizontal from "@/components/icons/FeatherMoreHorizontal";

import Comment from "@/components/Comment";

export default {
  name: "TweatDetail",
  components: {
    FeatherComments,
    FeatherHeart,
    FeatherShare,
    FeatherHash,
    FeatherMoreHorizontal,
    Comment,
  },
  setup() {
    const route = useRoute();
    const state = reactive({
      user: {
        username: localStorage.getItem("username"),
        avatar: localStorage.getItem("avatar_url"),
      },
      status: {
        mssg: "Looks like you've reach the end of the page.",
      },
      route: route.path.split("/").slice(2).join("/").replace(/\s/g, ""),
      access: localStorage.getItem("access_token"),
      tweats: [],
      loading: false,
    });

    async function fetchDetailTweats() {
      state.loading = true;
      await axiosInstance({
        method: "GET",
        url: state.route,
        headers: {
          Authorization: `Bearer ${state.access}`,
          "Content-Type": "application/json;charset=UTF-8",
        },
      })
        .then((res) => {
          console.log(res);
          state.tweats = res.data.results;
          state.loading = false;
        })
        .catch(() => {
          state.loading = false;
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
        if (numlike == "") numlike = 1;
        else numlike = Number(likedTw.innerText) + 1;

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

    return { state, likeTweat, fetchDetailTweats };
  },
  async created() {
    await this.fetchDetailTweats();
  },
  methods: {
    format,
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
};
</script>

<style lang="scss" scoped>
section {
  grid-column: span 6;
}
section {
  margin: 0 3rem 0 3rem;
  padding-bottom: 1rem;
  border: 1px solid #222;
  border-top: none !important;
  border-bottom: none !important;
  background: rgb(15, 15, 15);
  .section-top {
    padding: 0.5rem 1rem 0.5rem 1rem;
    top: 0;
    z-index: 999;
    position: sticky;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #222;
    background: #111;
    .top-return {
      display: flex;
      align-items: center;
      span {
        display: flex;
        align-items: center;
        transition: 0.2s ease-in-out;
        a {
          border-radius: 50%;
          padding: 0.3rem;
        }
        svg {
          transform: scale(0.9);
          transition: 0.2s ease-in-out;
        }
        &:hover {
          transition: 0.2s ease-in-out;
          a {
            background: rgba(52, 211, 153, 0.1);
          }
          svg {
            stroke: #34d399;
            transition: 0.2s ease-in-out;
          }
        }
      }
      h2 {
        cursor: pointer;
        margin-left: 1rem;
        font-size: 1.2em;
        font-weight: 600;
      }
    }
    .top-left {
      padding: 0.5rem;
      font-size: 1.2em;
      font-weight: 600;
    }
  }
}
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
</style>
