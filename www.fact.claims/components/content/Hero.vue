<template>
    <div v-if='card' class="max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <img :src="card.image" alt="card Image" class="w-full h-64 object-cover object-center">
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">{{ card.title }}</div>
        <p class="text-gray-700 text-base">{{ card.description }}</p>
      </div>
      <div class="px-6 pt-4 pb-2">
        <span
          v-for="tag in card.tags"
          :key="tag"
          class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
        >
          {{ tag }}
        </span>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      card: {
        type: Object,
        required: false,
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add any additional styling here */
  </style>
  