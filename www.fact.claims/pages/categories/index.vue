<script setup lang="ts">
// definePageMeta({
//   layout: "archive",
// });
import type { QueryBuilderParams } from "@nuxt/content/dist/runtime/types";
import { ContentDoc } from "~/.nuxt/components";
const { path } = useRoute();
const query: QueryBuilderParams = {
  path: path,
  sort: [{ title: 1 }],
};
</script>
<template>
  <flow-tiles>
    <!-- <ContentDoc></ContentDoc> -->
    <ContentList :query="query" v-slot="{ list }">
      <CardSummary
        v-for="card in list"
        :key="card._path"
        :test="card"
        :card="card"
      ></CardSummary>
    </ContentList>
  </flow-tiles>
</template>
