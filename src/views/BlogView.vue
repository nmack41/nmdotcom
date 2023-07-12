<template>
  <div class="blog"></div>
  <h1>Nick's Ramblings</h1>
  <div class="post">
    <ExSciToData />
  </div>
</template>

<script>
import ExSciToData from "../components/blogs/ExSciToData.vue";

export default {
  components: {
    ExSciToData,
  },
};
</script>

<style>
.blog {
  display: flex;
  align-items: top;
  justify-content: center;
}

.post {
  margin-top: 2em;
  width: 100%;
}
</style>
