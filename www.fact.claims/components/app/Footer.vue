<template>
  <footer class="fixed bottom-0 left-0 right-0 h-10">
    <div class="bg-current text-gray-100 text-white py-2">
      <div class="container mx-auto">
        <div class="flex flex-column justify-between">
          <atoms-brand-credit></atoms-brand-credit>
          <app-menu-footer :menu="menu"></app-menu-footer>
        </div>
      </div>
    </div>
  </footer>
</template>
<script setup>
const { public: settings } = useRuntimeConfig();
const props = defineProps({
  menu: {
    type: Array,
  }
});
</script>
<style scoped>
footer {
  z-index: 10000;
}
</style>