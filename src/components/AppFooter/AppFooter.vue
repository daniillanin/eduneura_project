<template>
    <Toolbar>
        <!-- <template #start></template> -->
        <template #center>
            <p>Разработчик - Ланин Даниил</p>
            <Button text icon="pi pi-github" severity="secondary" size="large"></Button>
            <Button text icon="pi pi-at" severity="secondary" size="large"></Button>
        </template>
        <!-- <template #end></template> -->
    </Toolbar>
</template>

<script setup lang="ts">
import { Toolbar, Button } from 'primevue';
</script>

<style scoped lang="scss">
@use "./AppFooter.scss";
</style>