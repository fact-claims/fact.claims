<template>
    <div >
        <nuxt-img v-if="brand?.logo" :src="brand.logo" class="w-8" @click="onAttention"/>
        <USlideover v-model="isOpen" side="left">
            <div @click="close" class="h-screen">
                <slot></slot>

            </div>
        </USlideover>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue"
const emit = defineEmits(["attention"])
const props = defineProps({
  brand: {
    type: Object,
    default: {}
  }
});

const isOpen = ref(false)

const close = async () => {
    console.log("close")
    isOpen.value = false
}
const onAttention = async (e: any) => {
    isOpen.value = !isOpen.value
    console.log("attention.click")
    emit("attention", props.brand?.ns?{ "@id": props.brand.ns}:{})
}
</script>