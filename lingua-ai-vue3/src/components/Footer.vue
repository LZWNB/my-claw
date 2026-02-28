<template>
  <footer class="border-t border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark px-4 py-12 text-sm sm:px-10">
    <div class="mx-auto max-w-7xl">
      <div class="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
        <!-- Brand -->
        <div class="flex flex-col gap-4">
          <div class="flex items-center gap-2 text-text-main dark:text-text-main-dark">
            <span class="material-symbols-outlined text-primary">language</span>
            <span class="text-lg font-bold">LinguaAI</span>
          </div>
          <p class="text-text-secondary dark:text-text-secondary-dark">让东亚地区的每个人都能获得无障碍、个性化且高效的语言学习体验。</p>
        </div>

        <!-- Platform -->
        <div class="flex flex-col gap-4">
          <h4 class="font-bold text-text-main dark:text-text-main-dark">平台</h4>
          <a class="text-text-secondary hover:text-primary dark:text-text-secondary-dark dark:hover:text-primary" href="#">功能</a>
          <a class="text-text-secondary hover:text-primary dark:text-text-secondary-dark dark:hover:text-primary" href="#">定价</a>
          <a class="text-text-secondary hover:text-primary dark:text-text-secondary-dark dark:hover:text-primary" href="#">面向学校</a>
          <a class="text-text-secondary hover:text-primary dark:text-text-secondary-dark dark:hover:text-primary" href="#">面向企业</a>
        </div>

        <!-- Resources -->
        <div class="flex flex-col gap-4">
          <h4 class="font-bold text-text-main dark:text-text-main-dark">资源</h4>
          <a class="text-text-secondary hover:text-primary dark:text-text-secondary-dark dark:hover:text-primary" href="#">博客</a>
          <a class="text-text-secondary hover:text-primary dark:text-text-secondary-dark dark:hover:text-primary" href="#">社区</a>
          <a class="text-text-secondary hover:text-primary dark:text-text-secondary-dark dark:hover:text-primary" href="#">帮助中心</a>
          <a class="text-text-secondary hover:text-primary dark:text-text-secondary-dark dark:hover:text-primary" href="#">语法指南</a>
        </div>

        <!-- Legal -->
        <div class="flex flex-col gap-4">
          <h4 class="font-bold text-text-main dark:text-text-main-dark">法律</h4>
          <a class="text-text-secondary hover:text-primary dark:text-text-secondary-dark dark:hover:text-primary" href="#">隐私政策</a>
          <a class="text-text-secondary hover:text-primary dark:text-text-secondary-dark dark:hover:text-primary" href="#">服务协议</a>
          <a class="text-text-secondary hover:text-primary dark:text-text-secondary-dark dark:hover:text-primary" href="#">Cookie 政策</a>
        </div>
      </div>

      <div class="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border-light dark:border-border-dark pt-8 sm:flex-row">
        <p class="text-text-secondary dark:text-text-secondary-dark">© 2023 LinguaAI Inc. 保留所有权利。</p>
        <div class="flex gap-6">
          <div class="flex items-center gap-2">
            <div class="h-2 w-2 rounded-full bg-green-500"></div>
            <span class="text-xs font-medium text-text-secondary dark:text-text-secondary-dark">系统运行正常</span>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// No script needed for this component
</script>
