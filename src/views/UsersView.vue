<template>
    <Dialog :visible="visibleSchedules" modal :closable="false" :style="{ width: '75rem' }" header="Расписания">
        <template #default>
            <div class="wrapper-dialog-schedules">
                <label v-for="item in schedules">
                    <span>{{ item.name }}</span>
                    <Checkbox v-model="selectedSchedules" :value="item.id" class="checkbox" name="checkbox"></Checkbox>
                </label>
            </div>
        </template>
        <template #footer>
            <Button label="Отменить" severity="secondary" @click="resolvePromise?.('Отменить')"></Button>
            <Button label="Сохранить" severity="primary" @click="resolvePromise?.('Сохранить')"></Button>
        </template>
    </Dialog>
    <Dialog :visible="visibleInstructions" modal :closable="false" :style="{ width: '75rem' }" header="Инструкции">
        <template #default>
            <div class="wrapper-dialog-schedules">
                <label v-for="item in instructions">
                    <span>{{ item.name }}</span>
                    <Checkbox v-model="selectedInstructions" :value="item.id" class="checkbox" name="checkbox"></Checkbox>
                </label>
            </div>
        </template>
        <template #footer>
            <Button label="Отменить" severity="secondary" @click="resolvePromise?.('Отменить')"></Button>
            <Button label="Сохранить" severity="primary" @click="resolvePromise?.('Сохранить')"></Button>
        </template>
    </Dialog>
    <DataTable :value="users" tableStyle="min-width: 50rem" stripedRows removableSort scrollable>
        <Column field="last_name" header="Фамилия" sortable></Column>
        <Column field="first_name" header="Имя" sortable></Column>
        <Column field="role" header="Роль" sortable></Column>
        <Column field="schedules" header="Расписания" sortable>
            <template #body="{ data }">
                <!-- <p v-for="item in data.schedules">
                    {{ schedules?.find(schedules_item => schedules_item.id == item)?.name }}
                </p> -->
                <Button text icon="pi pi-eye" severity="secondary" @click="editUserSchedules(data)"></Button>
            </template>
        </Column>
        <Column field="instructions" header="Инструкции" sortable>
            <template #body="{ data }">
                <!-- <p v-for="item in data.instructions">
                    {{ instructions?.find(instructions_item => instructions_item.id == item)?.name }}
                </p> -->
                <Button text icon="pi pi-eye" severity="secondary" @click="editUserInstructions(data)"></Button>
            </template>
        </Column>
        <Column field="quantity" header="Активен" sortable>
            <template #body="{ data, index }">
                <ToggleSwitch v-model="data.active" @change="updateUserActive(data, index)"/>
            </template>
        </Column>
        <Column field="id" header="ID" sortable></Column>
    </DataTable>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, watch } from 'vue'
import { useMainStore } from '@/stores/mainStore'
import { supabase } from '@/database/supabase'
import type { User, Schedule, Instruction } from '@/types/interfaces'
import { DataTable, Column, ToggleSwitch, Button, Dialog, Checkbox } from 'primevue'

const store = useMainStore()

const visibleSchedules = ref(false)
const visibleInstructions = ref(false)
const users = ref<User[] | null>(null)
const schedules = ref<Schedule[] | null>(null)
const instructions = ref<Instruction[] | null>(null)
const selectedSchedules = ref<string[] | null>(null)
const selectedInstructions = ref<string[] | null>(null)
const resolvePromise = ref<(value: string) => void>()

async function editUserSchedules(data: User): Promise<void> {
    visibleSchedules.value = true
    selectedSchedules.value = data.schedules
    let response = await new Promise(resolve => {
        resolvePromise.value = resolve
    })
    if (response == "Сохранить") {
        visibleSchedules.value = false
        await supabase.from("profiles").update({ schedules: selectedSchedules.value}).eq('id', data.id)
    } else if (response == "Отменить") {
        visibleSchedules.value = false
    }
}
async function editUserInstructions(data: User): Promise<void> {
    visibleInstructions.value = true
    selectedInstructions.value = data.instructions
    let response = await new Promise(resolve => {
        resolvePromise.value = resolve
    })
    if (response == "Сохранить") {
        visibleInstructions.value = false
        await supabase.from("profiles").update({ instructions: selectedInstructions.value}).eq('id', data.id)
    } else if (response == "Отменить") {
        visibleInstructions.value = false
    }
}
async function updateUserActive(data: User, index: number): Promise<void> {
    if (users.value) {
        await supabase.from("profiles").update({ active: users.value[index]?.active}).eq('id', data.id)
    }
}
onBeforeMount(async() => {
    const data_users = await supabase.from("profiles").select("*")
    users.value = data_users.data
    const data_schedules = await supabase.from("schedules").select("*")
    schedules.value = data_schedules.data
    const data_instructions = await supabase.from("instructions").select("*")
    instructions.value = data_instructions.data 
})
</script>

<style lang="scss">
.p-datatable {
    margin-top: 100px;
}
.wrapper-dialog-schedules{
    display: flex;
    flex-flow: column nowrap;
    label {
        display: flex;
        flex-flow: row-reverse nowrap;
        justify-content: left;
        span {
            margin: auto 0;
        }
        .checkbox {
            margin: 5px;
        }
    }
}
</style>