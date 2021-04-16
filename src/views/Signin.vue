<template>
  <div class="login-wrapper">
    <div class="image"></div>
    <div class="forms">
      <div class="inner-loading" v-if="reciveData">
        <LoadingSpinner />
        <div>
          <span>wait for logging in ...</span>
        </div>
      </div>
      <div class="inner" v-else>
        <h1 class="sub tracking-widest">
          Content Information
        </h1>
        <h1 class="sub-tweat hidden">
          Tweatter
        </h1>
        <div class="wrap">
          <form
            @submit.prevent="loginTweat"
            class="signin"
            :class="{ 'form-error': formError == true }"
          >
            <input
              type="email"
              name="email"
              id="email"
              placeholder="me@mywebsite.com"
              v-model="inputEmail"
            />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="************"
              v-model="inputPaswd"
            />
            <div class="buttons">
              <button type="submit">
                <span class="text-xl font-semibold">Log in</span>
              </button>
              <div>
                <a href="#">forgot password?</a>
                <router-link to="/join">Sign up for Tweatter</router-link>
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
    LoadingSpinner,
  },
  data() {
    return {
      reciveData: false,
      inputEmail: "",
      inputPaswd: "",
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
    async loginTweat() {
      this.reciveData = true;
      const error = await axiosInstance
        .post("token/", {
          email: this.inputEmail,
          password: this.inputPaswd,
        })
        .then((res) => {
          localStorage.setItem("access_token", res.data.access);
          localStorage.setItem("refresh_token", res.data.refresh);
          localStorage.setItem("username", res.data.username);
          localStorage.setItem("avatar", res.data.avatar);
          localStorage.setItem("isLogin", true);
          axiosInstance.defaults.headers["Authorization"] =
            "Bearer " + localStorage.getItem("access_token");
        })
        .catch(() => {
          this.formError = true;
        });

      if (error == null) {
        this.$router.push("/");
        this.reciveData = false;
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
      margin-top: 6rem;
      .sub-text {
        font-size: 1.875rem;
        line-height: 2.25rem;
      }
      .signin {
        display: flex;
        flex-direction: column;
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
              padding: 0.75rem 1rem 0.75rem 1rem;
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
    padding: 1rem !important;
    .inner {
      .sub {
        display: none !important;
      }
      .sub-tweat {
        font-weight: 800;
        letter-spacing: 0.1em;
        font-size: 4em !important;
        display: block !important;
      }
      .wrap {
        h3 {
          font-size: 1.5em !important;
        }
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
    }
  }
}
</style>
