<template>
    <AppNavbar></AppNavbar>
    <RouterView></RouterView>
    <!-- <AppFooter></AppFooter> -->
</template>

<script setup>
import { RouterView } from 'vue-router'
import AppNavbar from '@/components/AppNavbar/AppNavbar.vue';
import AppFooter from '@/components/AppFooter/AppFooter.vue';
</script>

<style scoped lang="scss">
</style>