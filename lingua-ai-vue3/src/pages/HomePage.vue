<template>
  <div class="min-h-screen bg-white dark:bg-gray-950">
    <Navbar />
    <main>
      <Hero />
      <Features />
      <Localization />
      <CTA />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Navbar from '../components/Navbar.vue';
import Hero from '../components/Hero.vue';
import Features from '../components/Features.vue';
import Localization from '../components/Localization.vue';
import CTA from '../components/CTA.vue';
import Footer from '../components/Footer.vue';
</script>
