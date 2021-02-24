<template>
  <div class="sidenav">
    <div class="wrapper">
      <div class="search">
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
          class="feather feather-search icon"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <span contenteditable="true">Search Tweat</span>
      </div>
      <div class="trendings">
        <h3>Trendings</h3>
        <div class="item">
          <p>Trending in country</p>
          <span>#besokLibur</span>
          <p class="ttweat">1000 tweats</p>
        </div>
        <div class="item">
          <span>Liburan Jakarta</span>
          <p class="ttweat">1000 tweats</p>
        </div>
        <div class="item">
          <p>Trending in country</p>
          <span>#gantiTanggalLibur</span>
          <p class="ttweat">1000 tweats</p>
        </div>
        <div class="item">
          <p>Trending in country</p>
          <span>#kapanBisaLibur</span>
          <p class="ttweat">1000 tweats</p>
        </div>
        <div class="item">
          <span>#libur</span>
          <p class="ttweat">1000 tweats</p>
        </div>
        <div class="more">
          <a href="">show more</a>
        </div>
      </div>
      <div class="related">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Sidenav",
};
</script>

<style lang="scss" scoped>
.sidenav {
  overflow: scroll;
  position: fixed;
  right: 0;
  height: 100%;
  scrollbar-width: none;
  border-left: 1px solid #222;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
  &:hover {
    scrollbar-width: thin;
    scrollbar-color: #111 #222;
    overflow-x: hidden !important;
  }
  .wrapper {
    width: 21rem;
    margin-top: 3rem;
    .search {
      margin-right: 1rem;
      margin-left: 1rem;
      display: flex;
      align-items: center;
      color: #ccc;
      padding: 0.75rem;
      margin-bottom: 1rem;
      border: 2px solid #222;
      // background-color: #eee;
      border-radius: 25px;
      .icon {
        transform: scale(0.7);
        margin-left: 0.5rem;
        margin-right: 1rem;
      }
    }
    .trendings {
      font-family: "Montserrat Alternates", sans-serif;
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
      color: #ccc;

      h3 {
        font-weight: 600;
        font-size: 1.3rem;
        padding: 0.35rem 1rem 0.5rem 1rem;
        border-bottom: 1px solid #222;
      }
      div:not(:last-child) {
        border-bottom: 1px solid #222;
      }
      .item {
        color: #eee;
        padding: 0.75rem 1rem 0.75rem 1rem;
        p {
          font-size: 0.75rem;
          line-height: 1rem;
        }
        span {
          font-family: "Roboto", sans-serif;
          font-weight: 500;
        }
        .ttweat {
          font-family: "Roboto", sans-serif;
        }
        &:hover {
          cursor: pointer;
          background-color: rgb(27, 27, 27);
        }
      }
      .more {
        padding: 1rem;
        font-size: 0.9em;
        color: #34D399;
      }
    }
  }
}
</style>
