<template>
  <div class="login-wrapper">
    <div class="image"></div>
    <div class="forms">
      <div class="inner">
        <h1 class="sub text-6xl font-extrabold tracking-widest">
          Content Information
        </h1>
        <div class="wrap">
          <h3 class="text-3xl font-bold">Join Tweatter Today</h3>
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
                <a href="/signup">Sign up for Tweatter</a>
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

export default {
  name: "Signin",
  data() {
    return {
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
      const error = await axiosInstance
        .post('token/', {
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
        .catch((err) => {
          if (err.response.status == 400) {
            this.formError = true;
          }
        });

      if (error == null) {
        this.$router.push("/");
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
  background: url("../../assets/images/pexels-photo-4252898.jpeg");
  background-size: cover;
  background-repeat: no-repeat;
  grid-column: span 6;
}
.form-error {
  input {
    outline: none;
    border: 1px solid crimson;
    color: crimson;
  }
}
.forms {
  font-family: "Montserrat", sans-serif;
  grid-column: span 6;
  margin: 5rem;
  .inner {
    color: #ddd;
    .wrap {
      margin-top: 6rem;
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
              margin: 0 0.5rem 0 0.5rem;
            }
          }
        }
      }
    }
  }
}
</style>
