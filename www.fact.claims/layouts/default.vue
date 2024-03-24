<template>
  <site-header :menu="header_menu" class=" "></site-header>

  <div class="mx-auto h-screen pt-10">
    <div class="desktop-gutter pt-2 overflow-y-auto">
      <slot></slot>

    </div>
  </div>
  <site-footer :menu="settings.menu.footer"></site-footer>
</template>
<script setup>
const { public: settings } = useRuntimeConfig();
const header_menu = ref()

onMounted( async() => {
})
</script>

<style>
.prose {
  max-width: inherit;
}

.prose h1 {
  margin-top: 8px;
  margin-bottom: 0px;
  color: var(--primary-background);
  font-size: 1.5em;
}

.prose h2 {
  margin-top: 1em;
  font-size: 1.5em;
}

.prose h2 a {
  text-decoration: dotted;
}
@media (min-width: 600px) {
  .desktop-gutter {
    padding-left: 10%;
    padding-right: 10%;
  }
  .desktop-gutter .prose {
    padding-left: 10%;
    padding-right: 10%;
  }
}
</style>
