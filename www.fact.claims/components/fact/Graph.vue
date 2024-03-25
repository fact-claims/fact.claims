<template>
    <v-network-graph v-if="graph" :nodes="graph.nodes" :edges="graph.edges" :layouts="graph.layouts" :configs="configs"
        v-model:selected-nodes="selectedNodes" v-model:selected-edges="selectedEdges" :event-handlers="eventHandlers" />
</template>

<script setup lang="ts">
import * as vNG from "v-network-graph"
import {
    ForceLayout,
    ForceNodeDatum,
    ForceEdgeDatum,
} from "v-network-graph/lib/force-layout"
import { Graph } from '../../factify';

const props = defineProps({
    graph: { type: Object as () => Graph, required: true }
})
const selectedNodes = ref<string[]>([])
const selectedEdges = ref<string[]>([])

const eventHandlers: vNG.EventHandlers = {
    "*": (type, event) => {
        console.log("graph.click: %o -> %o", type, event);
    },
    "node:click": ({ node }) => {
        console.log("graph.node: %o", node);
    },
}

const configs = vNG.defineConfigs({
    view: {
        layoutHandler: new ForceLayout({
            positionFixedByDrag: true,
            positionFixedByClickWithAltKey: true,
            createSimulation: (d3, nodes, edges) => {
                // d3-force parameters (<ForceNodeDatum, ForceEdgeDatum>)
                const forceLink = d3.forceLink(edges).id(d => d.id)
                return d3
                    .forceSimulation(nodes)
                    .force("edge", forceLink.distance(10).strength(0.9))
                    .force("collide", d3.forceCollide(50).strength(0.2))
                    .force("charge", d3.forceManyBody())
                    .force("center", d3.forceCenter().strength(0.1))
                    .alphaMin(0.1)

                // * The following are the default parameters for the simulation.
                // const forceLink = d3.forceLink<ForceNodeDatum, ForceEdgeDatum>(edges).id(d => d.id)
                // return d3
                //   .forceSimulation(nodes)
                //   .force("edge", forceLink.distance(100))
                //   .force("charge", d3.forceManyBody())
                //   .force("collide", d3.forceCollide(50).strength(0.2))
                //   .force("center", d3.forceCenter().strength(0.05))
                //   .alphaMin(0.001)
            }
        }),
    },
    node: {
        selectable: true,
        label: {
            visible: true,
            directionAutoAdjustment: true,
            fontFamily: undefined,
            fontSize: 11,
            lineHeight: 1.1,
            color: "#000000",
            margin: 2,
            direction: "south",
            text: "prefLabel",
        },
    },
})

</script>
