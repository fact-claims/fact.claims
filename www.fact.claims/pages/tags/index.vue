<script setup lang="ts">
definePageMeta({
  layout: "default",
});
import type { QueryBuilderParams } from "@nuxt/content/dist/runtime/types";
const { path } = useRoute();
const query: QueryBuilderParams = {
  path: path,
  sort: [{ title: 1 }],
  where: [{ id: { $not: 'home' } }],
};
</script>
<template>
  <div class="flex">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-8">
      <ContentList :query="query" v-slot="{ list }">
        <CardSummary v-for="card in list" :key="card._path" :card="card"></CardSummary>
      </ContentList>
    </div>
  </div>
</template>
