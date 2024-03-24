<template>
  <div class="footer-menu">
    <ul class="flex">
      <li class="mx-2" v-for="(item, index) in menu">
        <nuxt-link v-if="!item.external" :to="item.to">{{
          item.name
        }}</nuxt-link>
        <a v-else :href="item.to">{{ item.name }}</a>
      </li>
    </ul>
  </div>
</template>

<script setup>
const props = defineProps({ menu: Array });
</script>
