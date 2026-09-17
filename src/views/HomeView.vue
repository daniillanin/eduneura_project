<template>
    <div class="wrapper-view">
        <AppNavbar></AppNavbar>
        <div class="wrapper-main-content">
            <RouterView></RouterView>
        </div>
        <AppFooter></AppFooter>
    </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import AppNavbar from '@/components/AppNavbar/AppNavbar.vue';
import AppFooter from '@/components/AppFooter/AppFooter.vue';
</script>

<style scoped lang="scss">
.wrapper-view {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    .wrapper-main-content {
        box-sizing: border-box;
        padding-top: 20px;
        flex: 1 0 auto;
    }
}
</style>