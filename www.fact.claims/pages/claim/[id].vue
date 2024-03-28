<template>
  <div class="w-full flex pt-4">
    <div class="w-3/4">
      <client-only>
        <claims-wizard :claim="claim" @completed="doCompleted" @updated="doUpdated" :singleton="false"></claims-wizard>
        <!-- <h1 v-if="!claimed">pending</h1> -->
        <div v-if="claimed">
          <claims-json :data="claimed"></claims-json>
        </div>
      </client-only>
    </div>
    <div class="w-1/4 prose pr-2">
      <h2>Fact Map</h2>
      <fact-maps :nodes="nodes" :edges="edges" class="factmap"></fact-maps>
      <h2>JSON-LD</h2>
      <pre>
        {{ claimed }}
      </pre>
    </div>
  </div>

</template>

<script setup lang="ts">
import { ClaimsToLD, LDToGraph } from "~/factify"

definePageMeta({
  layout: 'app'
})
const router = useRouter();
const { params } = useRoute();
const { data: claim } = await useAsyncData(`claim-${params.id}`, () => {
  return queryContent().where({ "_path": "/claim/" + params.id }).findOne()
})
const claimed = ref()
const nodes = ref(), edges = ref();
// console.log("claim.wizard: %o", claim)

const doCompleted = async (sender: any) => {
  console.log("claim.doCompleted: %o", sender.data)
  doUpdated(sender);
}

const doUpdated = (sender: any) => {
  const template = (claim.value as any).template;
  const ctx = { ...sender.data };
  ctx["@id"] = (ctx["schema:url"] ? ctx["schema:url"] + "#claim_" : "urn:fact.claim:anonymous:") + params.id
  console.log("doUpdated: %o -> %o", ctx, template)
  claimed.value = ClaimsToLD.toLD(ctx, template);
  console.log("toLD: %o", claimed.value);
  const graph = new LDToGraph(claimed.value["@graph"]);
  nodes.value = graph.nodes;
  edges.value = graph.edges;
}

</script>
<style>
.factmap {
  max-height: 400px;
}
.sv-container-modern__title {
  padding-top: 1em;
}

.sv-page__title {
  margin-bottom: 1em;
  font-size: 1.3em;
}

.sv-body__timer,
.sv-body__page {
  margin-top: 0em;
}

h5 .sv-string-viewer {
  margin-top: 2em;
  font-weight: 500;
}

/* .survey {
  --primary: #4219b3;
  --background: #ffffff;
  --background-dim: #f3f3f3;
  --background-dim-light: #f9f9f9;
  --primary-foreground: #ffffff;
  --foreground: #161616;
  --base-unit: 8px;

} */
</style>