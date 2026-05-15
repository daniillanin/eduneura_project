<template>
    <!-- изменение расписания -->
    <Dialog :visible="visibleEditSchedule" modal :closable="false" :style="{ width: '25rem' }" header="Расписание">
        <template #default>
                <p>Введите новое название</p>
                <InputText v-model="scheduleName"/>
                <!-- <div class="wrapper-radio">
                    <p>Выберите категорию</p>
                    <label v-for="item in store.tableCategory" :key="item">
                        <span>{{ item }}</span>
                        <RadioButton v-model="tableCategory" :inputId="item" name="radio" :value="item" class="radio"/>
                    </label> 
                </div> -->
        </template>
        <template #footer>
            <Button severity="secondary" label="Отменить" @click="resolvePromise?.('Отменить')"></Button>
            <Button label="Сохранить" @click="resolvePromise?.('Сохранить')"></Button>
        </template>
    </Dialog>
    <Select v-model="selectedSchedule" :options="schedules" filter optionLabel="name" placeholder="Выберите расписание" style="width: 500px">
        <template #value="slotProps">
            <div v-if="slotProps.value" class="flex items-center">
                <div>{{ slotProps.value.name }}</div>
            </div>
            <span v-else>
                {{ slotProps.placeholder }}
            </span>
        </template>
    </Select>
    <div v-if="selectedSchedule">
        <div class="wrapper-edit-button">
            <div></div> <!-- не удалять, нужен в качестве противовеса выравнивания -->
            <Button text icon="pi pi-bars" severity="secondary" @click="router.push({name: 'lists'})"></Button>
            <span style="border-left: 1px solid black"></span>
            <Button text icon="pi pi-th-large" severity="secondary" @click="router.push({name: 'cards'})"></Button>
            <Button text icon="pi pi-cog" severity="secondary" @click="editSchedule"></Button>
        </div>
        <RouterView v-slot="{ Component }">
            <component :is="Component" :scheduleID="selectedSchedule?.id"></component>
        </RouterView>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, provide } from 'vue';
import { useRouter, useRoute, RouterView } from 'vue-router';
import { useMainStore } from '@/stores/mainStore';
import { supabase } from '@/database/supabase';
import type { Marker } from '@/types/interfaces';
import type { Schedule } from '@/types/interfaces';
import { Select, Button, Dialog, InputText } from 'primevue';

const route = useRoute()
const router = useRouter()
const store = useMainStore()

const visibleEditSchedule = ref(false)
const markers = ref<Marker[]>([])
const schedules = ref<Schedule[]>([])
const selectedSchedule = ref<Schedule>()
const scheduleName = ref("")
const resolvePromise = ref<(value: string) => void>()

provide("markers", markers)

async function editSchedule(): Promise<void> {
    visibleEditSchedule.value = true
    let index = schedules.value.findIndex(item => item.id == selectedSchedule.value?.id)
    scheduleName.value = schedules.value[index]?.name!
    let response = await new Promise<string>((resolve) => {
        resolvePromise.value = resolve
    })
    if (response == "Сохранить") {
        schedules.value[index]!.name = scheduleName.value!
        visibleEditSchedule.value = false
        await supabase.from('schedules').update({ name: scheduleName.value }).eq('id', selectedSchedule.value?.id)
    } else if (response == "Отменить") {
        visibleEditSchedule.value = false
    }
}
onMounted(async () => {
    let { data } = await supabase.from("schedules").select("*").eq("category", "Общая")
    data ? schedules.value = data : []
    const markers_response = await supabase.from("schedule_cards_markers").select("*")
    markers_response.data ? markers.value = markers_response.data : []
})
</script>

<style scoped lang="scss">
.wrapper-edit-button {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    margin: 10px 0px;
    div {
        width: 40px;
        margin-right: auto;
    }
    button:nth-last-child(2) {
        margin-right: auto;
    }
}
</style>