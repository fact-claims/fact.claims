<script setup lang="ts">
import type { QueryBuilderParams } from "@nuxt/content/dist/runtime/types";
const { path, params } = useRoute();

// console.log(params);
const query: QueryBuilderParams = {
  sort: [{ title: 1 }],
  where: [{ category: { $contains: params.slug } }],
};
</script>
<template>
  <main>
    <ContentDoc class="mb-4 prose"></ContentDoc>
    <ContentList :query="query">
      <template #default="{ list }">
        <MoleculesFeatured
          :card="card"
          v-for="card in list"
          :key="card._path"
          class="m-auto my-2 p-4"
        >
        </MoleculesFeatured>
      </template>
      <template #not-found>
        <!-- <p>Nothing found</p> -->
      </template>
    </ContentList>
  </main>
</template>
