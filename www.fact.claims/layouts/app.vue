<template>
  <div class="flex flex-col h-screen">
    <app-header :menu="header" class=" " @attention="onAttention"></app-header>

    <div class="flex-grow bg-red-200 overflow-y-auto">
      <slot></slot>
    </div>

    <app-footer :menu="footer" class="fixed bottom-0 left-0 right-0"></app-footer>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
// import { useRuntimeConfig } from "@nuxtjs/composition-api";

const { public: settings } = useRuntimeConfig();
const header = ref(settings.app?.header || settings.menu?.header)
const footer = ref(settings.app?.footer)

const onAttention = (focus: any) => {
  console.log("app.onAttention: %o", focus)
}
onMounted(async () => {
  console.log("app.onMounted: %o", focus)
  // const { $keycloak } = useNuxtApp();
  // header_menu.value = settings.menu.app_header
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
