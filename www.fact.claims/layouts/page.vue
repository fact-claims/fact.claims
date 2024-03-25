<template>
  <site-header :menu="settings.menu.header"></site-header>
  <div class="h-screen pt-20 pb-10 flex">
    <div class="w-1/4 prose">
      <site-tool-menu></site-tool-menu>
    </div>

    <div class="w-1/2 prose">
      <slot></slot>
    </div>

    <div class="w-1/4 prose">
      <!-- <h2>{{ settings.brand.name }}</h2> -->
      <site-page-menu></site-page-menu>
    </div>
  </div>
  <!-- <site-footer :menu="settings.menu.footer"></site-footer> -->
</template>

<script setup>
const { public: settings } = useRuntimeConfig();
const headerMenu = ref();

onMounted(async () => {
  // Your mounted logic here
});
</script>
