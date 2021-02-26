<template>
  <div class="header">
    <div class="wrappers">
      <div class="wrapper-nav">
        <router-link to="/">
          <div class="logo">
            <a href="">T</a>
          </div>
        </router-link>
        <header>
          <ul class="nav-wrapper">
            <li class="active"><a href="" class="item">
              <FeatherGrid /></a>
            </li>
            <li><a href="" class="item">
              <FeatherHash /></a>
            </li>
            <li><a href="" class="item">
              <FeatherLinkedin /></a>
            </li>
            <li><a href="" class="item">
              <FeatherMoreVertical /></a>
            </li>
          </ul>
        </header>
      </div>
      <div class="wrapper-content">
        <HeaderContent :user="user" :inUserView="inUserView" />
      </div>
    </div>
  </div>
</template>

<script>
import FeatherGrid from '../svgs/FeatherGrid'
import FeatherHash from '../svgs/FeatherHash'
import FeatherLinkedin from '../svgs/FeatherLinkedin'
import FeatherMoreVertical from '../svgs/FeatherMoreVertical'

import HeaderContent from "./HeaderContent";

export default {
  name: "Header",
  components: {
    HeaderContent,
    FeatherGrid,
    FeatherHash,
    FeatherLinkedin,
    FeatherMoreVertical,
  },
  props: {
    user: Object,
    inUserView: Boolean,
  },
};
</script>

<style lang="scss" scoped>
.header {
  grid-column: span 3;
  font-family: "Montserrat Alternates", sans-serif;
}
.wrappers {
  min-height: 100vh;
  height: 100%;
  max-height: 100%;
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  // border-right: 1px solid #222;
  .wrapper-nav {
    grid-column: span 1;
    position: fixed;
    min-height: 100vh;
    height: 100%;
    max-height: 100%;
    width: 5rem;
    z-index: 99;
    text-align: center;
    border-right: 1px solid #222;
    transform: translate3d(0, 0, 0);
    transition: all 350ms 50ms cubic-bezier(0.645, 0.045, 0.355, 1);
    .logo {
      color: #fff;
      margin-bottom: 2rem;
      font-size: 2em;
      display: flex;
      justify-content: center;
      text-align: center;
      padding: 0.5rem 0.5rem 0.5rem 0.5rem;
    }
    header {
      position: absolute;
      top: 50%;
      width: 100%;
      transform: translateY(-50%);
      list-style-type: none;
      padding-left: 0;
      .nav-wrapper {
        .active {
          .item {
            svg {
              stroke: #34D399;
            }
          }
        }
        li {
          position: relative;
          display: flex;
          justify-content: center;
          text-align: center;
          padding: 0 0.5rem 0 0.5rem;
          color: #fff;
          &:hover {
            svg {
              transition: 0.3s ease-in-out;
            }
            &:hover {
              svg {
                transition: 0.3s ease-in-out;
                stroke: #34D399;
              }
            }
          }
          .item {
            display: inline-block;
            font-weight: 500;
            font-size: 1.2em;
            letter-spacing: 0.5px;
            padding: 1rem;
            &:hover {
              border-radius: 40px;
              background-color: rgb(52, 211, 153, 0.1);
            }
          }
        }
        li:not(:first-child) {
          margin-top: 0.25rem;
        }
      }
    }
  }
  .wrapper-content {
    left: 6rem;
    position: fixed;
    min-height: 100vh;
    height: 100%;
    max-height: 100%;
    margin: 0 0.5rem 0 0.5rem;
    grid-column: span 5;
  }
}
</style>
