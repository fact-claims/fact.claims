<template>
  <div class="w-full flex pt-4">
    <div class="w-1/6 prose">
      <site-tool-menu></site-tool-menu>
    </div>
    <div class="w-1/3">
      <fact-maps :nodes="nodes" :edges="edges" @selectNode="onSelectNode" @hoverNode="onHoverNode"></fact-maps>
    </div>

    <div class="w-1/2 prose ">
      <fact-box v-if="selectedNode" :node="selectedNode" />
      <div v-else>
        <ContentDoc></ContentDoc>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { LDToGraph } from "../../factify"

definePageMeta({
  layout: 'app'
})

const nodes = ref({})
const edges = ref({})
const layouts = ref({})
const selectedNode = ref(null)

onMounted(async () => {
  const response = await fetch("/fact.claims.json");
  const json = await response.json();
  // console.log("claim.json: %o", json);
  const j2g = new LDToGraph(json["@graph"]);
  console.log("claim.j2g: %o", j2g);
  nodes.value = j2g.nodes;
  edges.value = j2g.edges;
});

const onSelectNode = (node: any) => {
  // console.log("onSelectNode: %o", node)
  selectedNode.value = node;
}
const onHoverNode = (node: any) => {
  // console.log("onHoverNode: %o", node)
}

</script>

<style>
.fact-box a {
  color: #008800;
}
</style>