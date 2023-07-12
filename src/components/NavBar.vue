<!-- <script setup></script> -->

<template>
  <nav class="navbar">
    <RouterLink class="navbar-name" to="/">Nick Mackowski</RouterLink>
    <div class="right-group">
      <RouterLink class="navbar-item-right" to="/blog">Blog</RouterLink>
      <RouterLink class="navbar-item-right" to="/about">About Nick</RouterLink>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 30px;
  background-color: #43474b;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1000;
}

.navbar-name {
  margin-right: 10px;
  color: white;
  font-size: 24px;
}

.right-group {
  margin-left: auto;
  display: flex;
}

.navbar-item-right {
  color: white;
  font-size: 14px;
  margin-left: 20px;
  transition: font-size 0.3s ease;
}

.navbar-item-right:hover {
  /* font-size: 16px; */
  font-weight: bold;
}
</style>
