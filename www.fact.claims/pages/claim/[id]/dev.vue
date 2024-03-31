<template>
  <div class="w-full flex p-4">
    <div class="w-1/3 prose h-full">
      <pre class="w-full">{{ jsonld }}</pre>
    </div>
    <div class="w-1/3">
      <fact-maps :nodes="nodes" :edges="edges"  v-if="nodes && edges"></fact-maps>
    </div>
    <div class="w-1/3 prose" v-if="nodes && edges">
      <ContentDoc class="border rounded shadow m-2 p-4" path="/claim/done/dev"></ContentDoc>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ClaimsToLD, LDToGraph } from "~/factify";

definePageMeta({
  layout: 'app'
});

const router = useRouter();
const { params } = useRoute();
const nodes = ref(null);
const edges = ref(null);
const jsonld = ref(null);
const baseURN = `urn:fact.claim:${params.id}:`;
console.log("init: %o -> %o", params, baseURN);

const { data: claim } = await useAsyncData(`claim-${params.id}`, () => {
    return queryContent().where({ "_path": "/claim/" + params.id }).findOne();
});

onMounted(async () => {
  const ctx = JSON.parse(window.localStorage.getItem(baseURN) || "{}");
  console.log("onMounted: %o -> %o", claim, ctx);
  jsonld.value = ClaimsToLD.toLD(ctx, claim.value.template);
  console.log("JSON-ld: %o", jsonld.value);
  const graph = new LDToGraph(jsonld.value["@graph"]);
  console.log("JSON-graph: %o", graph);
  nodes.value = graph.nodes;
  edges.value = graph.edges;
});
</script>

<style>
/* Your styles here */
</style>
