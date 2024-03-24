<template>
  <div class="text-white mr-0">
    <nuxt-link
      class="flex tracking-tight animated-link"
      to="/"
    >
      <nuxt-img v-if="brand.logo" :src="brand.logo" :alt="brand.name" width="32"/>
      <!-- <span class="ml-2 text-xl" v-if="brand.name" v-text="brand.name"></span> -->
    </nuxt-link>
  </div>
</template>

<script>
export default {
  name: "BrandLogo",
  props: {
    brand: {
      type: Object,
      required: true
    },
  },
};
</script>
