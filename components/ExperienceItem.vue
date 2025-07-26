<template>
  <div class="experience-item">
    <div class="flex justify-between items-start mb-4">
      <div class="flex-1">
        <h3 class="font-bold text-gray-900 dark:text-white text-lg mb-1">{{ title }}</h3>
        <p class="text-primary-600 dark:text-primary-400 font-medium">{{ company }}</p>
      </div>
      <span class="text-sm text-gray-500 dark:text-gray-500 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full whitespace-nowrap ml-4">{{ period }}</span>
    </div>
    <ul class="text-gray-700 dark:text-gray-300 space-y-2">
      <li v-for="(achievement, index) in achievements" :key="index" class="flex items-start">
        <div class="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
        <span class="leading-relaxed">{{ achievement }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  period: {
    type: String,
    required: true
  },
  achievements: {
    type: Array,
    required: true
  }
})
</script> 