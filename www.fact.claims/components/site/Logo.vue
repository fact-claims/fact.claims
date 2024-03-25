
<template>
  <div class="text-white mr-0" v-if="settings?.brand?.logo" >
    <nuxt-link class="flex tracking-tight animated-link" to="/">
      <nuxt-img :src="settings.brand.logo" width="100%" height="32"/>
    </nuxt-link>
  </div>
</template>

<script setup>
const { public: settings } = useRuntimeConfig();

</script>
