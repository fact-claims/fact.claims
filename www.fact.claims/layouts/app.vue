<template>
  <site-header :menu="settings.menu.header"></site-header>
  <div class="h-screen pt-10 pb-10 flex">
      <slot></slot>
  </div>
</template>

<script setup>
const { public: settings } = useRuntimeConfig();
const headerMenu = ref();

onMounted(async () => {
  // Your mounted logic here
});
</script>
