<template>
  <div class="login-wrapper">
    <div class="image"></div>
    <div class="forms">
      <div class="inner-loading" v-if="sendData">
        <LoadingSpinner />
        <div>
          <span>wait for us to proccess your information ...</span>
        </div>
      </div>
      <div class="inner" v-else>
        <h1 class="sub tracking-widest">
          Join Tweatter
        </h1>
        <div class="wrap">
          <h3 class="sub-text font-bold">
            NOTE: Try to not use your real email, we (tweatter) are not provide some security on your information here!
          </h3>
          <form
            @submit.prevent="loginTweat"
            class="signin"
            :class="{ 'form-error': formError == true }"
          >
            <input
              type="email"
              name="email"
              id="email"
              placeholder="me@gmail.com"
              v-model="inputEmail"
              @focus="focused"
            />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="************"
              v-model="inputPaswd"
              @focus="focused"
            />
            <input
              type="username"
              name="username"
              id="username"
              placeholder="your username"
              v-model="inputUsername"
              @focus="focused"
            />
            <small class="info hidden" id="max-length">
              max username length is 10.
            </small>
            <div class="buttons">
              <button type="submit">
                <span class="text-xl font-semibold">Join</span>
              </button>
              <div class="bottom-button">
                <a href="#">forgot password?</a>
                <router-link to="/login">already have account?</router-link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axiosInstance from "@/plugin/axios";
import LoadingSpinner from "@/components/LoadingSpinner";

export default {
  name: "Signin",
  components: {
    LoadingSpinner
  },
  data() {
    return {
      sendData: false,
      inputEmail: "",
      inputPaswd: "",
      inputUsername: "",
      formError: false,
    };
  },
  mounted() {
    if (
      localStorage.getItem("access_token") &&
      localStorage.getItem("isLogin")
    ) {
      this.$router.push("/");
    }
  },
  methods: {
    focused() {
      this.formError = false;
      var mssg = document.getElementById("max-length");
      if (!mssg.classList.contains("hidden")) {
        mssg.classList.add("hidden");
      }
    },
    async loginTweat() {
      if (!this.inputEmail || !this.inputUsername || !this.inputPaswd) {
        this.formError = true;
        return
      }
      if (this.inputUsername.length > 10) {
        this.mssg = document.getElementById("max-length");
        this.mssg.classList.toggle("hidden");
        this.formError = true;
        return
      }
      this.sendData = true;
      const error = await axiosInstance
        .post('register/', {
          email: this.inputEmail,
          username: this.inputUsername,
          password: this.inputPaswd,
        })
        .then(() => {
          this.$router.push("/login");
        })
        .catch(() => {
          this.formError = true;
        });

      if (error == null) {
        this.formError = true;
        this.sendData = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.login-wrapper {
  height: 100vh;
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  background-color: #111;
}
.image {
  overflow: hidden;
  position: relative;
  background: url("../assets/images/r-pexels-photo-4252898.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  grid-column: span 6;
}
.forms {
  font-family: "Montserrat", sans-serif;
  grid-column: span 6;
  padding: 2rem 5rem 2rem 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  .inner-loading {
    z-index: 99;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column !important;
    justify-content: center;
    align-items: center;
    div {
      margin-top: 1rem;
      span {
        font-size: 1.2rem;
        color: #ddd;
      }
    }
  }
  .inner {
    color: #ddd;
    .hidden {
      display: none;
    }
    .sub {
      font-size: 3.75rem;
      font-weight: 800;
      letter-spacing: 0.1em;
    }
    .wrap {
      margin-top: 4rem;
      .sub-text {
        font-size: 0.9rem;
      }
      .signin {
        display: flex;
        flex-direction: column;
        .info {
          margin-top: 0.2rem;
          color: crimson;
        }
        input {
          font-size: 1.1em;
          padding: 1rem;
          color: #111;
          border-radius: 4px;
          height: 3rem;
          margin-top: 1rem;
        }
        .buttons {
          margin-top: 2rem;
          button[type="submit"] {
            color: #ddd;
            width: 100%;
            border-radius: 4px;
            background-color: #2a2a2a;
            transition: 0.1s ease-in-out;
            padding: 1rem 4rem 1rem 4rem;
            &:hover {
              transition: 0.1s ease-in-out;
              background-color: #383838;
            }
          }
          div {
            margin-top: 0.5rem;
            display: flex;
            justify-content: center;
            align-items: center;
            color: rgba(59, 130, 246, 1);
            a {
              margin: 0 0.5rem 0 0.5rem;
            }
          }
        }
      }
    }
  }
}
.form-error {
  input {
    outline: none;
    border: 1px solid crimson;
    color: crimson;
  }
}
.hidden {
  display: hidden;
}
// media queries
@media only screen and (max-width: 1000px) {
  .image {
    grid-column: span 5;
  }
  .forms {
    grid-column: span 7;
  }
}
@media only screen and (max-width: 860px) {
  .image {
    grid-column: span 4;
  }
  .forms {
    grid-column: span 8;
  }
}
@media only screen and (max-width: 730px) {
  .image {
    grid-column: span 3;
  }
  .forms {
    grid-column: span 9;
  }
}
@media only screen and (max-width: 640px) {
  .image {
    display: none !important;
  }
  .forms {
    grid-column: span 12;
  }
}
@media only screen and (max-width: 480px) {
  .forms {
    padding: 2rem !important;
    .inner {
      .sub {
        font-size: 3em !important;
      }
      .sub-tweat {
        font-size: 0.9em !important;
        display: block !important;
      }
    }
  }
}
@media only screen and (max-width: 370px) {
  .forms {
    .inner {
      .sub-tweat {
        display: block !important;
        font-size: 3.5em !important;
      }
    }
    .buttons {
      div > a {
        font-size: 0.9em;
      }
      .bottom-button {
        display: flex;
        justify-content: space-between;
        text-align: center;
      }
    }
  }
}
</style>
