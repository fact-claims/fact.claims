<script setup lang="ts">
import type { QueryBuilderParams } from "@nuxt/content/dist/runtime/types";

definePageMeta({
  layout: 'app'
})

const query: QueryBuilderParams = {
  where: [{
    "_dir": "claim"
  }],
  sort: [{ title: 1 }],
};

function isCompleted(wizard: any) {
  if (!process.client) return false;
  const json = localStorage.getItem(wizard?._id) || null
  if (!json) return false;
  const checkpoint = JSON.parse(json) as any;
  return (checkpoint?.meta?.isCompleted)
}

//const { navigation, page, surround, globals } = useContent()

</script>
<template>
  <ContentDoc/>
  <!-- <flow-tiles>
    <ContentList :query="query" v-slot="{ list }">
      <div v-for="card in list" v-bind:key="card._path">
        <CardSummary  :key="card._path" :card="card" :enabled="!isCompleted(card)"></CardSummary>
      </div>
  </ContentList>

</flow-tiles> -->
</template>
