<script setup lang="ts">
const { path } = useRoute();
const { data } = await useAsyncData("home", () => queryContent(path).findOne()) as any;
// console.log(data);
const meta = useContentMeta(data.value);
useContentHead(data.value);
</script>

<template>
  <div class="relative">
    <ContentDoc v-slot="{ doc }" class="flex">
      <ContentRenderer class="prose pb-20 lg:w-full" :value="doc" />
      <div class="absolute top-4 right-4">
        <!-- <AtomsLinkList :categories="meta.categories"/> -->
        <UBadge class="p-2 m-1" :tag="item" v-for="item in meta.tags" :key="item">{{ item.title }}</UBadge>

      </div>
    </ContentDoc>
    <!-- <ContentRenderer :value="data" class="prose w-full mx-auto" /> -->
  </div>
</template>
