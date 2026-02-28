<template>
  <section class="bg-primary px-4 py-16 text-white sm:px-10">
    <div class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 md:flex-row">
      <div class="max-w-xl text-center md:text-left">
        <h2 class="text-3xl font-black tracking-tight sm:text-4xl">为您量身定制的本地化支持</h2>
        <p class="mt-4 text-blue-100 text-lg">我们为简体中文、繁体中文、日语和韩语使用者提供专门的支持和本地化界面。</p>
      </div>

      <div class="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div
          v-for="lang in languages"
          :key="lang.name"
          class="flex flex-col items-center justify-center rounded-xl bg-white/10 p-4 backdrop-blur-sm transition-transform hover:-translate-y-1"
        >
          <span class="text-2xl font-bold">{{ lang.name }}</span>
          <span class="text-xs text-blue-100">{{ lang.sub }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const languages = [
  { name: '中文', sub: '简体' },
  { name: '繁體', sub: '繁体' },
  { name: '日本語', sub: '日语' },
  { name: '한국어', sub: '韩语' },
];
</script>
