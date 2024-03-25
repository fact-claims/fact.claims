<template>
    <ul class="prose pl-4">
        <li v-for="link of links" :key="link.to">
            <a :href="link.to">{{ link.title }}</a>
        </li>
    </ul>
</template>
<script setup>
    const { public: settings } = useRuntimeConfig()
    
    const links = ref(settings.menu.links);
    
</script>