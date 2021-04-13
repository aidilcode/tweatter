<template>
  <aside class="sidebar">
    <div class="sidebar-wrapper">
      <div class="search-bar">
        <span>search</span>
      </div>
      <div class="trending-bar">
        <h2>Treding for you</h2>
        <div>
          <span>#Malang</span>
          <small>12.3K Tweats</small>
        </div>
        <div>
          <span>#Silicon Valley</span>
          <small>9.3K Tweats</small>
        </div>
        <div>
          <span>#Dirumah</span>
          <small>19.1K Tweats</small>
        </div>
        <div>
          <span>#Dallas</span>
          <small>14.1K Tweats</small>
        </div>
        <div>
          <span>#Technology</span>
          <small>16.1K Tweats</small>
        </div>
        <div class="show-more">
          <span>show more</span>
        </div>
      </div>
    </div>
  </aside>
</template>

<script>
export default {
  name: "Sidebar"
}
</script>

<style lang="scss" scoped>
.sidebar {
  grid-column: span 3;
}

.sidebar {
  .sidebar-wrapper {
    top: 1rem;
    position: sticky;
    margin: 1rem 1rem 0 0;
    .search-bar {
      margin-bottom: 1rem;
      padding: 0.75rem 1rem 1rem 1rem;
      width: 100%;
      border: 1px solid #222;
      border-radius: 4px;
    }
    .trending-bar {
      width: 100%;
      border: 1px solid #222;
      border-radius: 4px;
      h2 {
        padding: 1rem;
        font-size: 1.2em;
        font-weight: 700;
      }
      div {
        border-top: 1px solid #222;
        padding: 1.25rem 1rem 1rem 1rem;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        small {
          color: rgb(119, 119, 119);
        }
        &:hover {
          background: rgba(20, 20, 20, 0.9);
        }
      }
      .show-more {
        color: rgba(52, 211, 153, 0.7);
      }
    }
  }
}
</style>
