<template>
    <div v-if="jwt">
        <UTooltip :text="jwt.given_name" :shortcuts="['⌘', 'A']" v-if="jwt">
            <UAvatar @click="onAvatarClicked" src="/images/avatar/avatar-1.png"></UAvatar>
        </UTooltip>
        <USlideover v-model="isOpen" side="right">
            <div  @click="close" class="h-screen">
                <slot v-bind="jwt"></slot>

            </div>
        </USlideover>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue"

const jwt = ref<any>({})
const isOpen = ref(false)
onMounted( async () => {
    const { $keycloak: Keycloak } = await useNuxtApp();
    // $keycloak.up
    // jwt.value = (await $keycloak).tokenParsed || false
})

const close = async () => {
    console.log("close")
    isOpen.value = false;
}
const onAvatarClicked = async (e: any) => {
    isOpen.value = !isOpen.value
}
</script>