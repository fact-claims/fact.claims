<template>
  <div class="w-full flex pt-4">
    <div class="w-1/2 prose h-full">
      <ContentDoc class="border rounded shadow m-2 p-4" path="/claim/done/demo"></ContentDoc>
    </div>
    <div class="w-1/2 pr-2 factmap" v-if="nodes && edges">
      <fact-maps :nodes="nodes" :edges="edges"  v-if="nodes && edges"></fact-maps>
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
.factmap {
  max-height: 50%;
}
</style>
