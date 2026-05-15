<template>
  <AppNavbar></AppNavbar>
  <RouterView></RouterView>
</template>

<script setup>
import { RouterView } from 'vue-router'
import AppNavbar from '@/components/AppNavbar/AppNavbar.vue';
</script>