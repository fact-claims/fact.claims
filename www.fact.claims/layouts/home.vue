<template>
  <site-header :menu="settings.menu.header" class=" "></site-header>
  <div class="mx-auto h-screen pt-20 pb-10 flex">
    <!-- Left column for ToC menu -->
    <div class="w-1/4 prose" >
      <site-tool-menu></site-tool-menu>
    </div>

    <!-- Middle column for content -->
    <div class="w-1/2 prose">
      <slot></slot>
    </div>

    <!-- Right column for tools -->
    <div class="w-1/4 prose ml-8 ">
      <site-page-menu></site-page-menu>

      </div>
  </div>

  <site-footer :menu="settings.menu.footer"></site-footer>
</template>

<script setup>

const { public: settings } = useRuntimeConfig()
const headerMenu = ref()

onMounted(async () => {
  // Your mounted logic here
})
</script>

