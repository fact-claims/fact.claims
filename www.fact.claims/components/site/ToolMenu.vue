<template>
<ul>
    <ol v-for="link of settings.menu.taskbar" :key="link.to">
        <a :href="link.to">{{ link.title }}</a>
    </ol>
</ul>

</template>
<script setup>
const { public: settings } = useRuntimeConfig()
</script>