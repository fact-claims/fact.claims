<template>
  <footer class="h-10">
    <div class="bg-current text-gray-100 text-white py-2">
      <div class="container mx-auto">
        <div class="flex flex-column justify-between">
          <app-menu-footer :menu="settings.app.taskbar"></app-menu-footer>
        </div>
      </div>
    </div>
  </footer>
</template>
<script setup>
const { public: settings } = useRuntimeConfig();
</script>
<style scoped>
footer {
  z-index: 10000;
}
</style>