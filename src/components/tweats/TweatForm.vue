<template>
  <div class="forms">
    <form
      class="create-tweat"
      @submit.prevent="createNewTweat"
      :class="{ '--exceeded': newTweatCharCount > 255 }"
    >
      <div class="content-tweat">
        <span
          class="no-err"
          :class="{'form-error': state.formErrorType == 'form-error'}"
        >
          {{state.formErrorMsg}}
        </span>
        <contenteditable
          id="content-form"
          data-ph="What's Happening? ..."
          tag="div"
          :contenteditable="state.isEditable"
          v-model="state.newTweatContent"
          :noNL="false"
          :noHTML="false"
        />
        <div
          class="tweat-image"
          :class="{ 'not-has-image': !state.isHasImage }"
        >
          <img src="#" alt="" ref="setTweatImage" />
        </div>
        <div class="tweat-repr">
          <label for="tweatImage"><FeatherImage /></label>
          <div class="inputs">
            <input
              type="file"
              class="hidden"
              name="tweatImage"
              id="tweatImage"
              ref="tweatImage"
              @change="getImgeContent($event)"
            />
          </div>
          <button class="cta-submit" type="submit">Tweat</button>
        </div>
      </div>
    </form>
    <div class="divider"></div>
  </div>
</template>

<script>
import axiosInstance from "@/plugin/axios";

import FeatherImage from "../icons/FeatherImage";
import contenteditable from "vue-contenteditable";
import { reactive, computed } from "vue";

export default {
  name: "TweatForm",
  components: {
    contenteditable,
    FeatherImage,
  },
  setup() {
    const state = reactive({
      imageContent: "",
      isEditable: true,
      isHasImage: false,
      formErrorType: "",
      formErrorMsg: "",
      newTweatContent: "",
      contentImage: "",
      emitData: "",
    });

    const newTweatCharCount = computed(() => state.newTweatContent.length);

    // return states to the template
    return {
      state,
      newTweatCharCount,
    };
  },
  methods: {
    getImgeContent(event) {
      this.state.isHasImage = true;
      this.state.imageContent = event.target.files[0];
      this.$refs.setTweatImage.src = URL.createObjectURL(event.target.files[0]);
    },
    async createNewTweat() {
      var picture = '';
      var fktweat = '';
      var tmpicts = this.state.imageContent;
      // create fake tweat
      fktweat = document.getElementById("content-form").innerText;
      if (this.state.imageContent) {
        picture = URL.createObjectURL(this.state.imageContent)
      }

      if (fktweat == "" && tmpicts == "") {
        this.state.formErrorMsg = "tweat or image can't be empty"
        this.state.formErrorType = 'form-error'
      } else {
        this.state.newTweatContent = '';
        this.state.imageContent = '';
        this.state.emitData = {
          author__username: localStorage.getItem("username"),
          author__avatar_url: localStorage.getItem("avatar"),
          tweat: fktweat,
          picture_url: picture,
          created_at: 0,
        };
        this.state.isHasImage = false;
        // end of

        let formData = new FormData();
        let access = localStorage.getItem("access_token");

        // append data
        formData.append("tweat", fktweat);
        formData.append("picture", tmpicts);

        await axiosInstance({
          method: "POST",
          url: "tweats/",
          data: formData,
          headers: {
            Authorization: `Bearer ${access}`,
            "Content-Type": "application/json;charset=UTF-8",
          },
        }).catch((err) => {
          if (err.response.status == 400) {
            this.state.formErrorMsg = 'max uplaod image size is 3Mb'
            this.state.formErrorType = 'form-error'
          }
        });

        this.$emit('created', this.state.emitData);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.no-err {
  display: none;
}
.form-error {
  display: block !important;
  color: crimson;
}
.not-has-image {
  display: none !important;
}
.forms {
  width: 100%;
  padding: 1rem 0 1rem 0;
  .create-tweat {
    color: rgb(143, 143, 143, 0.5) !important;
    padding: 1rem;
    border: 1px solid #222;
    border-radius: 4px;
    word-break: break-all;
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
    .content-tweat {
      .tweat-image {
        // min-width: 512px;
        // min-height: 433px;
        max-width: 512px;
        max-height: 433px;
        margin-bottom: 0.5rem;
        overflow: hidden;
        position: relative;

        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 4px;

        background-color: #000;
      }
      .tweat-repr {
        padding-top: 1rem;
        display: flex;
        justify-content: space-between;
        border-top: 1px solid #222;
        svg {
          transition: 0.1s ease-in-out;
          cursor: pointer;
          &:hover {
            transition: 0.1s ease-in-out;
            stroke: #34d399;
          }
        }
        .cta-submit {
          padding: 0.25rem 2rem 0.25rem 2rem;
          border-radius: 4px;
          color: #eee;
          background-color: rgb(52, 211, 153, 0.75);
          &:hover {
            background-color: #34d399;
          }
        }
      }
    }
  }
}
.divider {
  margin-top: 1rem;
  border-bottom: 1px solid #222;
}
</style>