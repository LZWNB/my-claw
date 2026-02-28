<template>
  <router-view />
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import { useAppStore } from './stores/appStore';

const store = useAppStore();
const theme = computed(() => store.theme);

// Watch theme changes and apply to document
watch(theme, (newTheme) => {
  if (newTheme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}, { immediate: true });
</script>
