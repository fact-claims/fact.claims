<template>
  <a :href="brandDomain"><div class="footer-credit" v-html="copyright"></div></a>
</template>
<script setup>
const { public: settings } = useRuntimeConfig();
let currentYear = new Date().getFullYear();
const brandName = settings.brand.name

const brandDomain = (settings.brand?.domain?"https://"+settings.brand.domain:"/");
const copyright = "&copy; "+(settings.brand.copyright?settings.brand.copyright:brandName+" ")+" - "+currentYear;
</script>
