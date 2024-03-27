<template>
    <div class="h-screen w-full">
        <v-network-graph ref="graph" :nodes="nodes" :edges="edges" :layouts="layouts || {}" :configs="configs"
        v-model:selected-nodes="selectedNodes" v-model:selected-edges="selectedEdges" :event-handlers="eventHandlers">
        <template #edge-label="{ edge, ...slotProps }">
            <v-edge-label :text="edge.label" align="center" vertical-align="above" v-bind="slotProps" />
        </template>
    </v-network-graph>

    <div v-if="targetNodeId" ref="tooltip" class="tooltip" :style="{ ...tooltipPos, opacity: tooltipOpacity }">
        <div>{{ nodes[targetNodeId]?.name || "" }}</div>
    </div>

    </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, computed, watch } from 'vue';
import * as vNG from 'v-network-graph';
import { ForceLayout } from 'v-network-graph/lib/force-layout';
import { JSONToGraph } from '~/factify';

const props = defineProps({
    nodes: { type: Object as () => Record<string,vNG.Node>, required: true },
    edges: { type: Object as () => Record<string,vNG.Edge>, required: true },
})
const emit = defineEmits<{
    selectNode: [node: Record<string, any>]
    hoverNode: [node: Record<string, any>|null]
}>()

const graph = ref();
const layouts = ref();
const tooltipPos = ref({ left: '0px', top: '0px' });
const selectedNodes = ref<string[]>([]);
const selectedEdges = ref<string[]>([]);
const tooltip = ref<HTMLDivElement>();
const targetNodeId = ref<string>('');
const tooltipOpacity = ref(0); // 0 or 1
const NODE_RADIUS = 16;

const configs = vNG.defineConfigs({
    view: {
        autoPanAndZoomOnLoad: 'fit-content',
        layoutHandler: new ForceLayout({
            positionFixedByDrag: true,
            positionFixedByClickWithAltKey: true,
            createSimulation: (d3, nodes, edges) => {
                const forceLink = d3.forceLink(edges).id((d: any) => d.id);
                return d3
                    .forceSimulation(nodes)
                    .force('edge', forceLink.distance(100))
                    .force('charge', d3.forceManyBody())
                    .force('collide', d3.forceCollide(50).strength(0.2))
                    .force('center', d3.forceCenter().strength(0.05))
                    .alphaMin(0.001);
            },
        }),
    },
    edge: {
        selectable: true,
    },
    node: {
        selectable: true,
        label: {
            visible: true,
            directionAutoAdjustment: true,
            fontFamily: 'monospace',
            fontSize: 10,
            lineHeight: 1.1,
            color: '#000000',
            margin: 2,
            direction: 'south',
            text: (node: any) => JSONToGraph.label(node),
        },
    },
});

const eventHandlers = {
    '*': (type: string, event: any) => {
        // console.log("web.click: %o -> %o", type, event);
    },
    'node:pointerover': ({ node: nid }: { node: string }) => {
        targetNodeId.value = nid;
        tooltipOpacity.value = 1; // show
        // console.log('web.hover.node: %o -> %o', nid, props.nodes);
        const node = props.nodes[nid];
        emit('hoverNode', node);
    },
    'node:pointerout': () => {
        tooltipOpacity.value = 0; // hide
        emit('hoverNode', null);
    },
    'node:click': ({ node: nid }: { node: string }) => {
        const node = props.nodes[nid];
        console.log('web.click.node: %o -> %o', nid, node);
        emit('selectNode', node);
    },
};

const targetNodePos = computed(() => {
    if (!targetNodeId.value) return { x: 0, y: 0 };
    // console.log('targetNodePos: %o -> %o', layouts.value, targetNodeId.value);
    return targetNodeId.value ? layouts.value?.nodes[targetNodeId.value] : { x: 0, y: 0 };
});

watch(
    [targetNodePos, tooltipOpacity],
    () => {
        if (!graph.value || !tooltip.value || !targetNodePos.value) return;
        console.log("targetNodePos: %o", targetNodePos.value);
        if (!targetNodePos.value) return;

        // translate coordinates: SVG -> DOM
        const domPoint = graph.value.translateFromSvgToDomCoordinates(targetNodePos.value);
        // calculates top-left position of the tooltip.
        tooltipPos.value = {
            left: domPoint.x - tooltip.value.offsetWidth / 2 + 'px',
            top: domPoint.y - NODE_RADIUS - tooltip.value.offsetHeight - 10 + 'px',
        };
    },
    { deep: true }
);

console.log('fact.maps: %o -> %o', props, layouts);
</script>