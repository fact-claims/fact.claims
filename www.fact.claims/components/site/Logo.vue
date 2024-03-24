
<template>
  <div class="text-white mr-0">
    <nuxt-link
      class="flex tracking-tight animated-link"
      to="/"
    >
      <nuxt-img v-if="settings?.brand?.logo" :src="settings.brand.logo" width="32"/>
      <span class="ml-2 text-xl" v-if="settings?.brand?.name" v-text="settings.brand.name"></span>
    </nuxt-link>
  </div>
</template>

<script setup>
const { public: settings } = useRuntimeConfig();

</script>
