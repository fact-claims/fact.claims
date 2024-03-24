<template>
    <header class="bg-current fixed w-full top-0 left-0 right-0">
      <nav class="max-w-7xl mx-auto px-2">
        <!-- desktop view -->
        <div class="hidden md:flex items-center justify-between pb-2 pt-2">
          <div class="flex items-center">
            <site-logo></site-logo>
            <div class="ml-10 flex items-baseline space-x-4">
              <app-menu-main :menu="menu"></app-menu-main>
            </div>
          </div>

          <div>
              <app-avatar v-slot="jwt" >
                  <app-profile :jwt="jwt" class="p-8"></app-profile>
                  <UVerticalNavigation :links="settings.menu.account"></UVerticalNavigation>
              </app-avatar>
          </div>
        </div>

        <!-- mobile view -->
        <div class="md:hidden">
          <div>
            <UDropdown :items="settings.menu.account">
              <site-logo></site-logo>
            </UDropdown>
          </div>
        </div>
      </nav>
    </header>
</template>
<script setup>
const { public: settings } = useRuntimeConfig();
const menuOpen = ref(false);
const props = defineProps({
  menu: {
    type: Array,
  }
});

const toggleMenu = () => {
  console.log("header.toggle: %o", menuOpen.value)
  menuOpen.value = !menuOpen.value;
};
</script>
<style scoped>
header {
  z-index: 10000;
}
</style>