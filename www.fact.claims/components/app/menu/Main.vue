<template>
  <div class="ml-10 flex items-baseline space-x-4">
    <ul
      class="list-none justify-left text-gray-300 transition-all transition-500"
      v-bind:class="{ flex: !mobile }"
    >
      <li
        :key="element.label"
        v-for="(element, index) in menu"
        class="hover:text-white"
        v-bind:class="{
          'mr-4': index != Object.keys(menu).length - 1,
          block: mobile,
        }"
      >
        <a
          :href="element.to"
          v-if="element.external"
          target="_blank"
          rel="noopener noreferrer"
          class="animated-link"
          >{{ element.label }}</a>
        
        <nuxt-link v-else :to="element.to" class="animated-link">{{
          element.label
        }}</nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
const props = defineProps({
  menu: {
    type: Array,
  },
  mobile: {
    type: Boolean,
    default: false,
  },
});
</script>
