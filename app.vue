<template>
  <NuxtLayout class="flex flex-col h-screen pt-24">
    <NuxtPage class="flex-grow overflow-auto" />
    <div>{{ message }}</div>
  </NuxtLayout>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      message: "",
    };
  },
  async mounted() {
    const { text } = await (await fetch("/api/message")).json();
    this.message = text;
  },
};
</script>
