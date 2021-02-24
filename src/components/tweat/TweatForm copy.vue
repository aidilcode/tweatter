<template>
  <div class="forms">
    <form
      class="create-tweat"
      @submit.prevent="createNewTweat"
      :class="{ '--exceeded': newTweatCharCount > 180 }"
    >
      <label for="newTweat"
        ><strong>Create New Tweat</strong> ({{ newTweatCharCount }}/180)</label
      >
      <div class="option">
        Type:
        <select id="newTweatType" v-model="state.selectedTweatType">
          <option
            :value="option.value"
            v-for="(option, index) in state.tweatTypes"
            :key="index"
          >
            {{ option.name }}
          </option>
        </select>
      </div>
      <div class="tweat-input">
        <div contenteditable="true" id="newTweat">
          <span></span>
        </div>
        <textarea
          id="newTweat"
          name=""
          rows="3"
          cols="77"
          placeholder="Tell your story ...."
          v-model="state.newTweatContent"
        ></textarea>
      </div>
      <button>Tweat it!</button>
    </form>
  </div>
</template>

<script>
import { reactive, computed } from 'vue';

export default {
  name: "TweatForm",
  setup(props, ctx) {
    const state = reactive({
      newTweatContent: "",
      selectedTweatType: "instant",
      tweatTypes: [
        { value: "draft", name: "Draft" },
        { value: "instant", name: "Instant Tweat" },
      ],
    })

    const newTweatCharCount = computed(() => state.newTweatContent.length)

    function createNewTweat() {
      if (state.newTweatContent && state.selectedTweatType !== "draft") {
        ctx.emit('created', state.newTweatContent);
      }
      state.newTweatContent = "";
    }

    // return states to the template
    return {
      state,
      newTweatCharCount,
      createNewTweat
    }
  },
}
</script>

<style lang="scss" scoped>
.forms {
  padding: 1rem;
  width: 100%;
  overflow: hidden !important;
  display: inline-block;
  .option {
    float: right;
  }
  .create-tweat {
    &.--exceeded {
      color: rgb(141, 12, 38) !important;
      border-color: rgb(141, 12, 38) !important;
      textarea {
        color: rgb(141, 12, 38) !important;
        border-color: rgb(141, 12, 38) !important;
        &:focus {
          outline: none !important;
          border-color: rgb(141, 12, 38) !important;
        }
      }
      button {
        background-color: rgb(141, 12, 38);
        &:hover {
          cursor: auto;
          background-color: rgb(141, 12, 38) !important;
        }
      }
    }
    .option {
      select {
        color: #333;
      }
    }
    .tweat-input {
      margin-top: 1rem;
      textarea {
        padding: 0.5rem;
        color: #757575;
        font-family: Avenir, Helvetica, Arial, sans-serif;
        border: none;
        border: 1px solid #333;
        overflow:hidden;
        &:focus {
          outline: none !important;
          border-color: #222;
        }
      }
    }
    button {
      margin-top: 1rem;
      border-radius: 3px;
      outline: none !important;
      border: none !important;
      color: #fff;
      padding: 0.5rem 3rem 0.5rem 3rem;
      background-color: rgb(54, 54, 54);
      &:hover {
        cursor: pointer;
        background-color: #222;
      }
    }
  }
}
</style>