<script setup lang="ts">
import type { QueryBuilderParams } from "@nuxt/content/dist/runtime/types";
// const { path, params } = useRoute();

// console.log(params);
const query: QueryBuilderParams = {
  sort: [{ title: 1 }],
  where: [{ tags: { $contains: "home" } }],
};
</script>
<template>
  <main class="">

    <ContentDoc v-slot="{ doc }">
      <div class="flex">
        <div class="w-3/4">
          <ContentRenderer class="prose" :value="doc" />
        </div>

        <!-- Right column: Iframe -->
        <div class="w-1/4 m-2 flex items-center ">
        </div>
      </div>
    </ContentDoc>
  </main>
</template>
