<template>
  <div
    class="section-form"
    :class="[
      { tweating: state.forms.isSubmit },
      { stateError: state.forms.error },
    ]"
  >
    <form
      class="create-tweat"
      @submit.prevent="postNewTweat"
      :class="{ exceeded: newTweatCharCount > 255 }"
    >
      <div class="form" :class="{ empty: newTweatCharCount < 1 }">
        <contenteditable
          id="content-form"
          data-placeholder="What is Happening?"
          tag="div"
          :contenteditable="true"
          v-model="state.newTweatContent"
          :noNL="false"
          :noHTML="false"
        />
        <input
          type="file"
          id="image"
          ref="image"
          @change="getImgeContent($event)"
        />
        <div v-if="state.forms.error">
          <small>{{ state.forms.messg }}</small>
        </div>
        <div
          class="image-wrapper"
          :class="{ emptyImage: !state.getImageContent }"
        >
          <div class="close">
            <span><FeatherClose @click="closeImageContent" /></span>
          </div>
          <img src="#" ref="tweatImage" />
        </div>
      </div>
      <div class="divider"></div>
      <div class="tools">
        <div>
          <label for="image"><FeatherImage /></label>
        </div>
        <button class="btn-tweat" type="submit">Tweat</button>
      </div>
    </form>
  </div>
</template>

<script>
import { reactive, computed } from "vue";
import contenteditable from "vue-contenteditable";
import axiosInstance from "@/plugin/axios";

import FeatherImage from "@/components/icons/FeatherImage";
import FeatherClose from "@/components/icons/FeatherClose";

export default {
  name: "TweatForms",
  components: {
    contenteditable,
    FeatherImage,
    FeatherClose,
  },
  setup() {
    // state
    const state = reactive({
      newTweatContent: "",
      newImageContent: "",
      getImageContent: false,
      forms: {
        isSubmit: false,
        error: false,
        messg: "",
      },
      access: localStorage.getItem("access_token"),
    });

    // computed
    const newTweatCharCount = computed(() => state.newTweatContent.length);

    return {
      state,
      newTweatCharCount,
    };
  },
  methods: {
    getImgeContent(event) {
      this.state.getImageContent = true;
      this.state.newImageContent = event.target.files[0];
      this.$refs.tweatImage.src = URL.createObjectURL(event.target.files[0]);
    },
    closeImageContent() {
      this.state.getImageContent = false;
      this.state.newImageContent = "";
      this.$refs.tweatImage.src = "#";

      this.state.forms.error = false;
      this.state.forms.messg = "";
    },
    async postNewTweat() {
      this.state.forms.isSubmit = true;
      const tweat = document.getElementById("content-form").innerText;
      if (this.state.newImageContent == "" && tweat == "") {
        return;
      }

      const formData = new FormData();
      formData.append("tweat", tweat);
      formData.append("picture", this.state.newImageContent);
      await axiosInstance({
        method: "POST",
        url: "tweats/",
        data: formData,
        headers: {
          Authorization: `Bearer ${this.state.access}`,
          "Content-Type": "application/json;charset=UTF-8",
        },
      })
        .then(() => {
          this.state.newTweatContent = "";
          this.state.newImageContent = "";
          this.$refs.tweatImage.src = "#";
          this.state.forms.isSubmit = false;
          this.state.getImageContent = false;
          this.$emit("createTweat");
        })
        .catch((err) => {
          this.state.forms.isSubmit = false;
          if (err.response.data.includes("_io.BufferedRandom")) {
            this.state.forms.error = true;
            this.state.forms.messg = "max uploaded image is 2.4 Mb";
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.tweating {
  border: 1px solid #34d399 !important;
  background: #222;
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
}
.stateError {
  border: 1px solid rgb(141, 12, 38) !important;
  border-color: rgb(141, 12, 38) !important;
  color: rgb(141, 12, 38) !important;
  div[contenteditable="true"] {
    &:focus {
      color: rgb(141, 12, 38) !important;
      outline: none !important;
      border-color: rgb(141, 12, 38) !important;
    }
  }
  .state-error {
    color: crimson !important;
  }
  .btn-tweat {
    color: #fff;
    background: rgb(141, 12, 38) !important;
    &:hover {
      background: rgba(220, 20, 60, 0.5) !important;
    }
  }
}
.section-form {
  padding: 3rem 1.5rem 1rem 1.5rem;
  .empty {
    div[contenteditable="true"]:empty:not(:focus):before {
      content: attr(data-placeholder) !important;
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
    .divider {
      border-color: rgb(141, 12, 38);
    }
    .tools {
      color: rgb(141, 12, 38);
    }
    .btn-tweat {
      color: #fff;
      background: rgb(141, 12, 38) !important;
      &:hover {
        background: rgba(220, 20, 60, 0.5) !important;
      }
    }
  }
  .form {
    padding: 0.5rem;
    div[contenteditable="true"] {
      word-break: break-all;
    }
    div[contenteditable="true"]:focus {
      color: #bbb;
    }
    div[contenteditable="true"]:not(:focus) {
      color: rgb(119, 119, 119);
    }
    input[type="file"] {
      display: none;
    }
    .emptyImage {
      display: none;
    }
    .image-wrapper {
      // max-height: 500px !important;
      overflow: hidden;
      img {
        border-radius: 2px;
      }
      .close {
        top: 1rem;
        position: relative;
        span {
          float: right;
        }
        svg {
          cursor: pointer;
          padding: 0.31rem;
          background-color: rgba(220, 20, 60, 0.5);
          border-radius: 50%;
          transform: scale(0.8);
        }
        svg:hover {
          background-color: rgba(220, 20, 60, 0.9);
        }
      }
    }
  }
  .divider {
    margin: 0.5rem 0.5rem 0 0.5rem;
    border-top: 1px solid #222;
    width: auto;
  }
  .tools {
    margin: 1rem 0.5rem 0 0.5rem;
    display: flex;
    justify-content: space-between;
    .btn-tweat {
      padding: 0.5rem 2.5rem 0.5rem 2.5rem;
      background: rgba(52, 211, 153, 0.5);
      border-radius: 4px;
      transition: 0.2s ease-in-out;
      &:hover {
        transition: 0.2s ease-in-out;
        color: #fff;
        background: #34d399;
      }
    }
  }
}
</style>
