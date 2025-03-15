<template>
  <div class="app-wrapper">
    <NuxtLayout>
      <NuxtPage class="flex-grow overflow-auto" />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: "Nick Mackowski",
  ogTitle: "Nick Mackowski",
  description: "Site of Nick Mackowski",
  ogDescription: "Site of Nick Mackowski",
  ogImage: "assets/Nick_circle_2.png",
});
</script>

<style>
.app-wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding-top: 6rem;
}
</style>
