<!-- <script setup></script> -->
<!--
Brand Guidelines
Twitter: https://about.twitter.com/content/dam/about-twitter/en/brand-toolkit/downloads/twitter-external-brand-guidelines-01272021.pdf
Linkedin: https://brand.linkedin.com/downloads
GitHub: https://github.com/logos
-->
<template>
  <header class="bg-gray-700 fixed w-full top-0 left-0 z-30">
    <nav class="flex p-4 items-center">
      <NuxtLink class="text-white text-xl mr-4" to="/">Nick Mackowski</NuxtLink>
      <div class="socialclass ml-2">
        <Social />
      </div>
      <div class="ml-auto flex">
        <!-- <NuxtLink
          class="link"
          to="/contactme"
          >Contact Me</NuxtLink
        > -->
        <!-- <NuxtLink
          class="link"
          to="/blog"
          >Blog</NuxtLink
        > -->
        <NuxtLink
          class="link"
          to="/"
          >About Nick</NuxtLink
        >
      </div>
    </nav>
  </header>
</template>

<style scoped>
.link { 
  color: white; 
  font-size: 0.875rem; 
  margin-left: 1.5rem;
  transition: all 0.3s; 
}

.link:hover {
  font-weight: bold;
}
</style>