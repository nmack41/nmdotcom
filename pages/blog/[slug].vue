<template>
  <main class="container mx-auto px-4 py-8">
    <ContentDoc>
      <template #default="{ doc }">
        <article class="prose lg:prose-xl">
          <h1>{{ doc.title }}</h1>
          <p v-if="doc.description" class="text-gray-600">
            {{ doc.description }}
          </p>
          <p v-if="doc.author" class="text-sm text-gray-500">
            By {{ doc.author }}
          </p>
          <ContentRenderer :value="doc" />
        </article>
      </template>

      <template #not-found>
        <h1>Post Not Found</h1>
        <p>Sorry, the requested blog post could not be found.</p>
      </template>
    </ContentDoc>
  </main>
</template>

<script setup>
const route = useRoute();
// Strip .md extension if present in the slug
const slug = route.params.slug.replace(/\.md$/, "");
const path = `/blog/${slug}`;

// Try to directly query the content
const { data: document } = await useAsyncData(`content-${slug}`, () =>
  queryContent("blog").where({ _path: path }).findOne()
);

// Log debugging information
console.log("Route params:", route.params);
console.log("Cleaned path:", path);
console.log("Document found:", document.value);
</script>
