<template>
  <NuxtLayout class="flex flex-col h-screen pt-24">
    <NuxtPage class="flex-grow overflow-auto" />
  </NuxtLayout>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Nick Mackowski',
  ogTitle: 'Nick Mackowski',
  description: 'Site of Nick Mackowski',
  ogDescription: 'Site of Nick Mackowski',
  ogImage: 'assets/Nick_circle_2.png',
})
</script>