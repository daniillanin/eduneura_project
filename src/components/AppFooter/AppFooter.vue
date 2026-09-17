<template>
    <Toolbar class="main-toolbar">
        <!-- <template #start></template> -->
        <template #center>
            <!-- <p>developer Ланин Даниил</p> -->
            <Button as="a"
                text
                icon="pi pi-github"
                severity="secondary"
                size="large"
                href="https://github.com/daniillanin"
                target="_blank"
            ></Button>
            <Button as="a"
                text
                icon="pi pi-at"
                severity="secondary"
                size="large"
                href="mailto:eduneura@yandex.ru"
            ></Button>
        </template>
        <!-- <template #end></template> -->
    </Toolbar>
</template>

<script setup lang="ts">
import { Toolbar, Button } from 'primevue';
</script>

<style lang="scss">
@use "./AppFooter.scss";
</style>