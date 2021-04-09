<template>
  <div class="comment-tweat" v-if="userIsComment && repliedTo">
    <div class="inner">
      <div class="wrap" id="comment-wrapper" :class="{ '--exceeded': commentContentLength > 255 }">
        <small>replying to <span>@{{repliedTo}}</span> tweat</small>
        <p v-if="whatTweat">{{whatTweat}}</p>
        <contenteditable
          id="content-comment"
          data-ph="Tweat your reply ..."
          tag="div"
          :contenteditable="true"
          v-model="commentContent"
          :noNL="false"
          :noHTML="true"
        />
        <div class="btn-wrapper">
          <div class="cancel" @click="cancel">close</div>
          <div class="reply" id="reply-btn" @click="reply">Reply</div>
        </div>
      </div>
    </div>
  </div>
  <div class="tweat mt-2">
    <router-link
      :to="{
        name: 'TweatDetail',
        params: { username: author, id: id },
      }"
    >
      <div class="author-wrapper">
        <div class="info">
          <div class="img">
            <img :src="authorAvatar" alt="" width="30" height="30" />
          </div>
          <router-link
            :to="{ name: 'UserProfile', params: { username: author } }"
            class="author font-medium"
            >{{ author }}</router-link
          >
        </div>
      </div>
      <div class="content">
        <div class="content-body">
          {{ tweat }}
        </div>
        <div v-if="pictureUrl" class="content-image">
          <img :src="pictureUrl" alt="" srcset="" />
        </div>
      </div>
    </router-link>
    <div class="content-repr">
      <div class="comments">
        <FeatherComments @click="commentTweat(author, tweat, id)" />
        <span :id="'comment-' + id">{{ format(comments_count) }}</span>
      </div>
      <div class="likes">
        <FeatherHeart
          :id="'isliked-' + id"
          :class="{ liked: likes.includes(username) }"
          @click="likeTweat(id)"
        />
        <span :id="'like-' + id">{{ format(likes_count) }}</span>
      </div>
      <div class="shares">
        <FeatherShare />
      </div>
    </div>
  </div>
</template>

<script>
import axiosInstance from "@/plugin/axios";

// import FeatherMoreHorizontal from "@/components/icons/FeatherMoreHorizontal";
import FeatherComments from "@/components/icons/FeatherComments";
import FeatherHeart from "@/components/icons/FeatherHeart";
import FeatherShare from "@/components/icons/FeatherShare";

export default {
  name: "TweatItems",
  components: {
    // FeatherMoreHorizontal,
    FeatherComments,
    FeatherHeart,
    FeatherShare,
  },
  props: {
    id: String,
    author: {
      type: String,
      required: true,
    },
    tweat: {
      type: String,
      required: true,
    },
    likes_count: {
      type: Number,
      required: true,
    },
    comments_count: {
      type: Number,
      required: true,
    },
    likes: {
      type: Object,
      required: true,
    },
    authorAvatar: {
      type: String,
      required: true,
    },
    pictureUrl: {
      type: [Object, String],
      required: true,
    },
    createdAt: {
      type: String,
      required: true,
    },
    inUserView: Boolean,
  },
  data() {
    return {
      username: localStorage.getItem("username"),
      userIsComment: false,
      repliedTo: "",
      commentContent: "",
      whatTweat: "",
      tweatId: 0,
    };
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
    moreOption(id) {
      const DDbuttons = document.getElementById(`ddb-${id}`);
      DDbuttons.classList.toggle("block");
    },
    commentTweat(author, tweat, id) {
      this.userIsComment = true;
      this.repliedTo = author;
      this.whatTweat = tweat;
      this.tweatId = id;
    },
    cancel() {
      this.userIsComment = false;
      this.repliedTo = "";
      this.whatTweat = "";
      this.tweatId = 0;
    },
    async reply() {
      var numCom;
      var wrp = document.getElementById("comment-wrapper");
      var btn = document.getElementById("reply-btn");
      var elm = document.getElementById(`comment-${this.tweatId}`);
      const comment = document.getElementById("content-comment").innerText;

      wrp.classList.add("sending-reply")
      btn.classList.add("submit-reply")

      let access = localStorage.getItem("access_token");
      let formData = new FormData();
      formData.append("content", comment);

      if (numCom == "") {
        numCom = 1;
      } else {
        numCom = Number(elm.innerText) + 1;
      }
      elm.innerText = numCom;

      await axiosInstance({
        method: "POST",
        url: `tweat/comment/${this.tweatId}`,
        data: formData,
        headers: {
          Authorization: `Bearer ${access}`,
          "Content-Type": "application/json;charset=UTF-8",
        },
      })
      .then(() => {
        wrp.classList.remove("sending-reply")
        btn.classList.remove("submit-reply")
        this.cancel()
      })
      .catch((err) => console.error(err));
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
  },
  computed: {
    commentContentLength() {
      return this.commentContent.length
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
  margin-top: 1.5rem;
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
      z-index: 999 !important;
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
        transition: 0.2s ease-in-out;
        &:hover {
          transition: 0.2s ease-in-out;
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
    .content-repr-2 {
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

.comment-tweat {
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  max-width: 100%;
  height: 100%;
  max-height: 100%;
  background-color: rgba(17, 17, 17, 0.6);
  .inner {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .sending-reply {
      border-color: #34d399 !important;
    }
    .submit-reply {
      background-color: rgb(52, 211, 153, 0.1) !important;
    }
    .wrap {
      border-radius: 4px;
      width: 36rem;
      padding: 1.5rem 2rem 1rem 2rem;
      background-color: #111;
      border: 1px solid #222;
      color: #ccc;
      display: flex;
      flex-direction: column !important;
      p {
        word-break: break-all;
        margin: 0.5rem;
        padding: 0.25rem 0.25rem 0.35rem 0.75rem;
        border-left: 1px solid #222;
      }
      small {
        span {
          color: #34d399;
        }
      }
      #content-comment {
        margin-top: 0.5rem;
        word-break: break-all;
      }
      [contentEditable="true"]:empty:not(:focus):before {
        content: attr(data-ph);
        color: grey;
      }
      [contenteditable="true"] {
        font-size: 1.1em;
        padding: 0.5rem 0 1rem 0;
        &:focus {
          color: rgb(192, 192, 192) !important;
          outline: 0px solid transparent !important;
        }
      }
      .btn-wrapper {
        display: flex;
        justify-content: flex-end;
        div {
          cursor: pointer;
        }
        div:not(:first-of-type) {
          margin-left: 0.5rem;
        }
        .cancel {
          padding: 0.5rem 2rem 0.5rem 2rem;
        }
        .reply {
          border-radius: 4px;
          border: 1px solid #34d399;
          padding: 0.5rem 2rem 0.5rem 2rem;
          transition: 0.2s ease-in-out;
          &:hover {
            transition: 0.2s ease-in-out;
            background-color: rgb(52, 211, 153, 0.1);
          }
        }
      }
      &.--exceeded {
        border-color: rgb(141, 12, 38) !important;
        [contenteditable="true"] {
          color: rgb(141, 12, 38) !important;
          &:focus {
            color: rgb(141, 12, 38) !important;
            outline: none !important;
            border-color: rgb(141, 12, 38) !important;
          }
        }
        .reply {
          border: 1px solid rgb(141, 12, 38) !important;
          color: rgb(141, 12, 38) !important;
          &:hover {
            background-color: #111 !important;
          }
        }
      }
    }
  }
}
</style>
