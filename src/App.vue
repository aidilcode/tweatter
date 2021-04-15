<template>
  <router-view />
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
  outline: none !important;
}

html {
  scroll-behavior: smooth;
  scrollbar-width: thin;
  scrollbar-color: #ddd #222;
}

body {
  color: #bbb;
  background: #111;
}

#tweatter-app {
  width: auto;
  height: 100vh;
  display: grid;
  grid-gap: 1em;
  grid-template-columns: repeat(12, minmax(0, 1fr));
}

// media-queries
@media only screen and (max-width: 1200px) {
  header {
    nav {
      .avatar-bottom {
        display: block !important;
        img {
          border-radius: 50% !important;
        }
      }
    }
    aside {
      .info > span {
        margin-left: 0 !important;
      }
      .info > img {
        display: none !important;
      }
    }
  }
}
@media only screen and (max-width: 1100px) {
  header {
    aside {
      .user {
        height: 5rem !important;
      }
      .user > .about {
        display: none !important;
      }
    }
  }
  section {
    margin: 0 1.5rem 0 1.5rem !important;
  }
}
@media only screen and (max-width: 1000px) {
  header {
    aside > .aside-wrapper > .contents {
      .maker {
        label {
          height: 7rem !important;
        }
      }
    }
  }
}
@media only screen and (max-width: 950px) {
  #tweatter-app {
    grid-gap: 0 !important;
  }
  header {
    grid-column: span 4 !important;
    aside {
      .maker {
        label {
          display: flex;
          align-items: center;
          text-align: center;
          justify-content: center;
          width: auto;
          height: 11rem !important;
          cursor: pointer;
          font-size: 2em;
        }
      }
    }
  }
  section {
    margin: 0 1.5rem 0 1.5rem !important;
    grid-column: span 8 !important;
  }
  .sidebar {
    display: none !important;
  }
}
@media only screen and (max-width: 800px) {
  header {
    grid-column: span 4;
    grid-template-columns: repeat(8, minmax(0, 1fr));
    nav {
      grid-column: span 2;
    }
    aside {
      grid-column: span 6 !important;
      .maker {
        label {
          display: flex;
          align-items: center;
          text-align: center;
          justify-content: center;
          width: auto;
          height: 6rem !important;
          cursor: pointer;
          font-size: 2em;
        }
      }
    }
  }
  section {
    margin: 0 !important;
    grid-column: span 8 !important;
    border-left: none !important;
  }
}
@media only screen and (max-width: 700px) {
  header {
    grid-column: span 2 !important;
    nav {
      grid-column: span 8 !important;
    }
    aside {
      display: none !important;
    }
  }
  section {
    margin: 0 !important;
    grid-column: span 10 !important;
  }
}
@media only screen and (max-width: 550px) {
  header {
    nav {
      grid-column: span 8;
    }
    aside {
      display: none !important;
    }
  }
  section {
    margin: 0 !important;
    grid-column: span 10;
  }
}
@media only screen and (max-width: 400px) {
  header {
    z-index: 99;
    grid-column: span 12 !important;
    width: 100vw;
    bottom: 0;
    position: fixed !important;
    nav {
      height: 4rem !important;
      display: flex;
      flex-direction: row !important;
      align-items: flex-end !important;
      justify-content: center !important;
      background: #111;
      border-top: 1px solid #222;
      .nav-logo {
        display: none !important;
      }
      .nav-items {
        margin-bottom: 0.75rem;
        display: flex;
        flex-direction: row !important;
        align-items: center;
        .item-logout {
          padding: 0.4rem !important;
          margin: 0 0.75rem 0 0.75rem !important;
          display: inline-flex !important;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          border-radius: 50%;
          a {
            padding: 0.75rem;
            color: crimson;
            display: inline-block;
            border-radius: 50%;
            color: #bbb;
            svg {
              transform: scale(0.8) !important;
              transition: 0.2s ease-in-out;
            }
          }
          &:hover {
            transition: 0.2s ease-in-out;
            background-color: rgba(155, 79, 94, 0.1) !important;
            svg {
              stroke: crimson !important;
              transition: 0.2s ease-in-out;
            }
          }
        }
        .item {
          padding: 0.4rem !important;
          margin: 0 0.75rem 0 0.75rem !important;
          a {
            color: crimson;
            padding: 0.15rem !important;
            svg {
              transform: scale(0.7);
            }
          }
        }
      }
      .nav-bottom {
        display: none !important;
      }
      .nav-bottom > .content {
        display: none !important;
      }
    }
  }
  section {
    margin: 0 !important;
    grid-column: span 12 !important;
    .section-top {
      padding: 0.85rem 1.75rem 0.85rem 1.75rem !important;
      display: flex !important;
      align-items: center !important;
    }
    .tabs {
      border-top: 1px solid #222 !important;
    }
    .wrap-top {
      display: flex;
      align-items: center;
      .user-profile-top {
        margin-right: 1rem;
        display: block !important;
        img {
          border-radius: 50% !important;
        }
      }
    }
    .tweat:nth-last-child(1) {
      margin-bottom: 1rem !important;
    }
    .bottom-end {
      margin-bottom: 4rem !important;
    }
  }
}
</style>
