<template>
  <app-header :menu="settings.menu.header"></app-header>

  <div class="container min-h-[80vh] mx-auto">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
      <slot></slot>
    </div>
  </div>
  <OrganismsFooter fixed></OrganismsFooter>
</template>

<script setup>
  const { public: settings } = useRuntimeConfig();
</script>


<style>
.prose {
  max-width: inherit;
}
</style>
