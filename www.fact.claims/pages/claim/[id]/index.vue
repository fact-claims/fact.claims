<template>
  <div class="w-full flex pt-4">
    <div class="w-3/4">
      <client-only>
        <claims-wizard :claim="claim" @completed="doCompleted" @updated="doUpdated" :singleton="false" class="border rounded shadow m-2" v-model="loaded"></claims-wizard>
      </client-only>
    </div>
    <div class="w-1/4 prose pr-2" v-if="nodes && edges">
      <ContentDoc class="border rounded shadow m-2 p-4"></ContentDoc>
      <h2>Fact Map</h2>
      <fact-maps :nodes="nodes" :edges="edges" class="factmap"></fact-maps>
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

const baseURN = `urn:fact.claim:${params.id}:`;
const claimed = ref(), loaded = ref()
const nodes = ref(), edges = ref();
// console.log("claim.wizard: %o", claim)

onMounted( () => {
  const ctx = window.localStorage.getItem(baseURN);
  console.log("claim.onMounted: %o", ctx?ctx:false);
  if (!ctx) return;
    doUpdated({ data: loaded.value = JSON.parse(ctx) })
})

const doCompleted = async (sender: any) => {
  doUpdated(sender);
  console.log("claim.doCompleted: %o", sender.data);
  router.push("/claim/"+params.id+"/done")
}

const doUpdated = (sender: any) => {
  const template = (claim.value as any).template;
  const ctx = { ...sender.data };
  ctx["@id"] = baseURN + ctx["schema:url"]
  console.log("doUpdated: %o -> %o", ctx, template)
  claimed.value = ClaimsToLD.toLD(ctx, template);
  console.log("toLD: %o", claimed.value);
  const graph = new LDToGraph(claimed.value["@graph"]);
  nodes.value = graph.nodes;
  edges.value = graph.edges;

  console.log("claim.save: %o -> %o", baseURN, ctx)
  window.localStorage.setItem(baseURN, JSON.stringify(ctx));
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