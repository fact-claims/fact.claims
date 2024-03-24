<script setup lang="ts">
import type { QueryBuilderParams } from "@nuxt/content/dist/runtime/types";
const { path, params } = useRoute();
// console.log(params);
const query: QueryBuilderParams = {
  sort: [{ title: 1 }],
  where: [{ tags: { $contains: params.slug } }],
};
</script>
<template>
  <main>
    <ContentDoc class="mb-4 prose">
    </ContentDoc>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap- my-8 md:ml-16 md:mr-16">
      <ContentList :query="query">
        <template #default="{ list }">
          <CardSummary :card="card" v-for="card in list" :key="card._path" class="m-auto my-2 p-4">
          </CardSummary>
        </template>
        <template #not-found>
          <!-- <p>Nothing found</p> -->
        </template>
      </ContentList>
    </div>
  </main>
</template>
