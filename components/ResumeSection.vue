<template>
  <div class="card">
    <h2 class="section-title flex items-center">
      <div class="w-1 h-8 bg-gradient-to-b from-primary-500 to-primary-600 rounded-full mr-3"></div>
      {{ title }}
    </h2>
    <slot />
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  }
})
</script> 