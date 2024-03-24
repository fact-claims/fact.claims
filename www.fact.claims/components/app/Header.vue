<template>
    <header class="bg-current">
      <nav class="max-w-7xl mx-auto px-2">
        <!-- desktop view -->
        <div class="hidden md:flex items-center justify-between pb-2 pt-2">
          <div class="flex items-center">
            <app-attention :brand="settings.brand" class="w-8" @click="onAttention"/>
            <div class="ml-10 flex items-baseline space-x-4">
              <app-menu-main :menu="menu"></app-menu-main>
            </div>
          </div>

          <div>
              <app-avatar v-slot="jwt" >
                  <app-profile :jwt="jwt" class="p-8 app-profile"></app-profile>
                  <UVerticalNavigation :links="settings.menu.account"></UVerticalNavigation>
              </app-avatar>
          </div>
        </div>

        <!-- mobile view -->
        <div class="md:hidden flex">
          <div>
            <app-attention :brand="settings.brand" class="w-8 app-attn" @click="onAttention"/>
            <app-profile :jwt="jwt" class="p-8 float-right  app-profile"></app-profile>
            <!-- <UDropdown :items="settings.menu.account">
              <atoms-logo :brand="settings.brand"></atoms-logo>
            </UDropdown> -->
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
const emit = defineEmits(["attention"])
const onAttention = () => {
  emit("attention", { "@id": "my:Self" })
}
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