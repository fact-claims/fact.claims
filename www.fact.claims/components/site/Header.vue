<template>
  <header class="bg-white fixed w-full top-0 left-0 right-0">
    <nav class="mx-auto px-2 flex items-center justify-between">
      <div class="w-1/4">
        <site-logo class="mt-2"></site-logo>
      </div>
      <div class="w-1/2 text-center">
        <UHorizontalNavigation :links="menu"></UHorizontalNavigation>
      </div>
      <div class="w-1/4"></div>
    </nav>
  </header>
</template>

<script setup>
const { public: settings } = useRuntimeConfig();
const menu = [settings.menu.header];
</script>
