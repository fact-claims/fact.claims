<script setup lang="ts">
import type { QueryBuilderParams } from "@nuxt/content/dist/runtime/types";
const { path } = useRoute();
const query: QueryBuilderParams = {
  path: path,
  //limit: 5,
  sort: [{ title: 1 }],
};
</script>
<template>
  <main>
    <ContentList :query="query" v-slot="{ list }">
      <AtomsBaseCard
        v-for="article in list"
        :key="article._path"
        class="m-auto my-2 p-4"
      >
        <a :href="article._path"
          ><h2 class="text-xl text-primary">{{ article.title }}</h2></a
        >
        <p>{{ article.description }}</p>
      </AtomsBaseCard>
    </ContentList>
  </main>
</template>
