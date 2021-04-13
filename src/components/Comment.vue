<template>
  <div class="comment-overlay">
    <div class="wrapper">
      <div
        class="inner"
        id="inner"
        :class="[
          { exceeded: commentCharCount > 255 },
          { empty: commentCharCount < 1 },
        ]"
      >
        <small
          >replying to <span>@{{ author }}</span> tweat</small
        >
        <p v-if="tweat">{{ tweat }}</p>
        <contenteditable
          id="content-comment"
          data-placeholder="Tweat your reply ..."
          tag="div"
          :contenteditable="true"
          v-model="state.content"
          :noNL="false"
          :noHTML="true"
        />
        <div class="btn-wrapper">
          <div class="cancel" @click="cancel">close</div>
          <div class="reply" id="reply" @click="replyingComment">Reply</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, computed } from "vue";
import contenteditable from "vue-contenteditable";
import axiosInstance from "@/plugin/axios";

export default {
  name: "Comment",
  components: {
    contenteditable,
  },
  props: {
    id: String,
    author: String,
    tweat: String,
  },
  setup() {
    const state = reactive({
      content: "",
    });

    const commentCharCount = computed(() => state.content.length);

    return {
      state,
      commentCharCount,
    };
  },
  methods: {
    replyingComment() {
      let access = localStorage.getItem("access_token");
      var inners = document.getElementById("inner");
      var button = document.getElementById("reply");
      var commnt = document.getElementById("content-comment").innerText;

      inners.classList.add("sendings");
      button.classList.add("replying");

      let formData = new FormData();
      formData.append("content", commnt);

      axiosInstance({
        method: "POST",
        url: "tweat/comment/" + this.id,
        data: formData,
        headers: {
          Authorization: `Bearer ${access}`,
          "Content-Type": "application/json;charset=UTF-8",
        },
      })
        .then(() => {
          inners.classList.remove("sendings");
          button.classList.remove("replying");
        })
        .catch((err) => console.error(err));

      this.$emit("closeComment", true);
    },
    cancel() {
      this.$emit("closeComment", null);
    },
  },
};
</script>

<style lang="scss" scoped>
.comment-overlay {
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  max-width: 100%;
  height: 100%;
  max-height: 100%;
  background-color: rgba(17, 17, 17, 0.6);
  .wrapper {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .empty {
      div[contenteditable="true"]:empty:not(:focus):before {
        content: attr(data-placeholder) !important;
      }
    }
    .sending {
      border-color: #34d399 !important;
    }
    .replying {
      background-color: rgb(52, 211, 153, 0.1) !important;
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
      .reply {
        border-color: rgb(141, 12, 38) !important;
        &:hover {
          background-color: rgba(220, 20, 60, 0.1) !important;
        }
      }
    }
    .inner {
      border-radius: 4px;
      width: 34rem;
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
      div[contenteditable="true"] {
        margin: 0.5rem 0 1.5rem 0;
        word-break: break-all;
      }
      div[contenteditable="true"]:focus {
        color: #bbb;
      }
      div[contenteditable="true"]:not(:focus) {
        color: rgb(119, 119, 119);
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
}
</style>
