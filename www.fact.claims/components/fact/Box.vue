<template>
    <div  class="border rounded prose p-4 mr-4">
        <h3 class="">{{ LDToGraph.label(node,64) }}</h3>
      <div v-for="(value, key) in node" :key="key" class="flex pt-2">
        <div class="w-1/4"><b>{{ key }}</b></div>
        <div class="w-3/4" v-html="format(value)"></div>
      </div>
    </div>
  </template>


<script setup lang="ts">
import { LDToGraph } from '~/factify';


const props = defineProps({
    node: { type: Object as () => Record<string, any>, required: true },
})
const emit = defineEmits<{
    selectNode: [node: Record<string, any>]
    hoverNode: [node: Record<string, any>|null]
}>()

const format = (value: any): string => {
    if (typeof value == "string" ) {
        if (value.indexOf(":")>0) {
            return `<a href="$value">`+value+"</a>";
        }
        return value;
    }
    if (Array.isArray(value)) {
        return value.map( v => format(v)).join(", ")
    }
    if (typeof value == "object" ) {
        return '<a href="'+value["@id"]+ '">'+LDToGraph.label(value)+"</a>";

    }
    return value?.toString() || "?";
}

</script>
<style>

</style>