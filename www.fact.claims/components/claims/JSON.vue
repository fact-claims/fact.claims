<template>
    <div>
      <div v-for="(value, name) in data" :key="name" class="flex space-x-4 mb-2">
        <div class="rounded-full bg-blue-500 text-white py-2 px-4">{{ name }}</div>
        <div class="rounded-full bg-gray-500 text-white py-2 px-4">{{ formatValue(value) }}</div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      data: {
        type: Object,
        required: true
      }
    },
    methods: {
      formatValue(value) {
        if (Array.isArray(value)) {
          return value.join(', ');
        }
        return value;
      }
    }
  }
  </script>
  
  <style>
  /* Add Tailwind CSS classes here if needed */
  </style>
  