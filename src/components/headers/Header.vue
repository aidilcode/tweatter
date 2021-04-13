<template>
  <header>
    <nav>
      <div class="nav-logo">
        <router-link to="/">T</router-link>
      </div>
      <ul class="nav-items">
        <li class="item active">
          <a href="#">
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
              class="feather feather-grid"
              data-v-4238a576=""
            >
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
          </a>
        </li>
        <li class="item">
          <a href="#">
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
              class="feather feather-grid"
              data-v-4238a576=""
            >
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
          </a>
        </li>
        <li class="item">
          <a href="#">
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
              class="feather feather-grid"
              data-v-4238a576=""
            >
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
          </a>
        </li>
        <li class="item">
          <a href="#">
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
              class="feather feather-grid"
              data-v-4238a576=""
            >
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
          </a>
        </li>
      </ul>
      <div class="nav-bottom">
        <div class="avatar-bottom">
          <img
            src="https://drive.google.com/uc?id=1aW7hzFNDk5q1igkvnJCoYpbZIdsdi2D0&export=download"
            alt=""
            width="35"
            height="35"
          />
        </div>
        <div class="content">#</div>
      </div>
    </nav>
    <Aside />
  </header>
</template>

<script>
import Aside from "./Aside";

export default {
  name: "Header",
  components: {
    Aside,
  },
};
</script>

<style lang="scss" scoped>
// header
header {
  grid-column: span 3;
  display: grid;
  grid-template-columns: repeat(8, minmax(0, 1fr));
  background: #111;
  nav {
    width: auto;
    height: 100vh;
    grid-column: span 2;
    border-right: 1px solid #222;
  }
  aside {
    width: auto;
    height: 100vh;
    grid-column: span 6;
    border-right: 1px solid #222;
  }
}

header {
  nav {
    top: 0;
    position: sticky;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    .nav-logo {
      margin: 1rem 0 0 0;
      font-size: 2em;
    }
    .nav-items {
      .active {
        svg {
          stroke: #34d399;
        }
      }
      .item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        border-radius: 50%;
        a {
          color: crimson;
          display: inline-block;
          border-radius: 50%;
          padding: 1rem;
          color: #bbb;
          svg {
            transition: 0.2s ease-in-out;
          }
        }
        &:hover {
          background: rgba(52, 211, 153, 0.1);
          svg {
            stroke: #34d399;
            transition: 0.2s ease-in-out;
          }
        }
      }
    }
    .nav-bottom {
      margin: 0 0 2rem 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      .avatar-bottom {
        display: none;
      }
      .content {
        padding: 0.25rem 0.75rem 0.5rem 0.75rem;
        border-radius: 50%;
        background: #111;
      }
    }
  }
}
</style>
