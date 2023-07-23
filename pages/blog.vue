<template>
  <div class="p-8">
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
@media (prefers-color-scheme: dark) {
  div a {
    color: #eee;
  }
}

.article {
  font-family: Arial, sans-serif;
  max-width: auto;
  margin: 0 auto;
  padding-left: 10%;
  padding-right: 10%;
}

.article h1 {
  text-align: center;
  font-size: 2em;
}

.article h2 {
  font-size: 1.5em;
  margin-top: 20px;
}

.article h3 {
  font-size: 1.3em;
  margin-top: 15px;
}

.article p,
.article li {
  line-height: 1.6;
}

.article a {
  color: #0066cc;
}

.article ul {
  margin-left: 20px;
}
</style>
