<template>
    <div class="flex items-center justify-between mt-8">
      <div class="w-3/4" v-if="jwt">
        <strong>{{ jwt.given_name }} {{ jwt.family_name }}</strong>
        <div>{{ jwt.email }}</div>
      </div>
      <div class="w-1/4 text-right">
        <UButton label="Logout" @click="logout"></UButton>
      </div>
    </div>
  </template>
<script setup>
const props = defineProps({
  jwt: {
    type: Object,
  },
  menu: {
    type: Array,
  }
});

const logout = async () => {
  const { $keycloak } = await useNuxtApp()
  $keycloak.logout()
}
</script>
