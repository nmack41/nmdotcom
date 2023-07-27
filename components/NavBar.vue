<!-- <script setup></script> -->
<!--
Brand Guidelines
Twitter: https://about.twitter.com/content/dam/about-twitter/en/brand-toolkit/downloads/twitter-external-brand-guidelines-01272021.pdf
Linkedin: https://brand.linkedin.com/downloads
GitHub: https://github.com/logos
-->
<template>
  <header class="bg-gray-700 fixed w-full top-0 left-0 z-30">
    <nav class="flex justify-between p-4 items-center">
      <NuxtLink class="text-white text-xl mr-4" to="/">Nick Mackowski</NuxtLink>
      <div class="socialclass ml-2">
        <Social />
      </div>
      <div class="flex">
        <NuxtLink
          class="text-white text-sm ml-6 transition-all duration-300 hover:font-bold"
          to="/newsletter"
          >Newsletter</NuxtLink
        >
        <NuxtLink
          class="text-white text-sm ml-6 transition-all duration-300 hover:font-bold"
          to="/blog"
          >Blog</NuxtLink
        >
        <!-- <NuxtLink
          class="text-white text-sm ml-6 transition-all duration-300 hover:font-bold"
          to="/"
          >About Nick</NuxtLink
        > -->
      </div>
    </nav>
  </header>
</template>
<style scoped>
.navbar-item-right:hover {
  font-weight: bold;
}
</style>
