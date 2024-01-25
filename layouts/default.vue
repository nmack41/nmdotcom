<template>
  <div>
    <header>
      <div id="navbar-app" class="p-10"><NavBar /></div>
    </header>
    <slot />
  </div>
  <div>
    <footer>
      <div id="footer-app"><Footer /></div>
    </footer>
  </div>
</template>


<script setup>
useHead ({
  titleTemplate: '%s - Nick Mackowski'
})

</script>