<script setup>
import { RouterLink, RouterView } from "vue-router";
import { ref } from "vue";
import NavBar from "./components/NavBar.vue";
</script>

<template>
  <header>
    <div id="navbar-app"><NavBar /></div>
  </header>
  <RouterView />
</template>
<style>
body {
  padding-top: 10px;
}

body {
  display: flex;
  flex-direction: column;
}

#navbar-app {
  display: flex;
  flex-direction: column;
  height: 10vh;
}

.content {
  flex-grow: 1;
  overflow: auto;
}
</style>
