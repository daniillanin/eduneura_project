<template>
    <Card class="card">
        <template #header style="height: 200px;">
            <div class="wrapper-edit">
                <Button text icon="pi pi-chevron-left" severity="secondary" size="small" @click="shiftCardLeft"></Button>
                <Button text icon="pi pi-chevron-right" severity="secondary" size="small" @click="shiftCardRight"></Button>
                <Button text icon="pi pi-pencil edit" severity="secondary" size="small" @click="editCard"></Button>
                <Button text icon="pi pi-times delete" severity="secondary" size="small" @click="deleteCard"></Button>
            </div>
            <img :src="props.dataCard.image"/>
        </template>
        <template #title>{{ props.dataCard.title }}</template>
        <!-- <template #subtitle>Card subtitle</template> -->
        <template #content>
            <div v-html="props.dataCard.content_card"></div>
        </template>
        <template #footer>
            <div class="markers">
                <div v-for="(idMarker) in props.dataCard.markers" :key="idMarker" class="marker" :style="{'background-color': markers?.find(item => item.id === idMarker)?.color}">
                {{ markers?.find(item => item.id === idMarker)?.title }}
                </div>
            </div>
        </template>
    </Card>
</template>

<script setup lang="ts">
import { ref, inject } from 'vue';
import type { Marker } from '@/types/interfaces';
import { Card, Button } from 'primevue';
import { useMainStore } from '@/stores/mainStore';

const store = useMainStore();

const props = defineProps(["dataCard", "indexCard"]);
const emit = defineEmits(["edit-card", "delete-card", "shift-card-right", "shift-card-left"])
const markers = inject<Marker[]>("markers")

function editCard(): void {
    emit("edit-card", props.indexCard)
}
function deleteCard(): void {
    emit("delete-card", props.indexCard)
}
function shiftCardRight(): void {
    emit("shift-card-right", props.indexCard)
}
function shiftCardLeft(): void {
    emit("shift-card-left", props.indexCard)
}
</script>

<style lang="scss">
@use "./AppCard.scss";
</style>