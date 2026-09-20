<template>
    <Select v-model="selectedInstruction" :options="filteredInstructions" filter optionLabel="name" placeholder="Выберите инструкцию" style="width: 500px">
        <template #value="slotProps">
            <div v-if="slotProps.value" class="flex items-center">
                <div>{{ slotProps.value.name }}</div>
            </div>
            <span v-else>
                {{ slotProps.placeholder }}
            </span>
        </template>
    </Select>
    <AppInstruction :instructionID="selectedInstruction?.id" @delete-instruction="cancelledSelector"></AppInstruction>
    <AppNoData v-if="selectedInstruction == null"></AppNoData>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { supabase } from "@/database/supabase";
import { useMainStore } from "@/stores/mainStore";
import type { Instruction } from "@/types/interfaces";
import AppInstruction from "@/components/AppInstruction/AppInstruction.vue";
import { Select } from 'primevue';
import AppNoData from '@/components/AppNoData/AppNoData.vue';

const store = useMainStore()

const instructions = ref<Instruction[]>([]);
const selectedInstruction = ref<Instruction | null>(null);

const filteredInstructions = computed(() =>  {
    return instructions.value.filter(item => store.currentUserData?.instructions?.includes(item.id))
    
})
async function cancelledSelector() {
    selectedInstruction.value = null
    let { data, error } = await supabase.from("instructions").select("*").eq("category", "Для лекторов")
    if (!error) {
        data ? instructions.value = data : []
        store.showAlert('success', "Успешно", 'Инструкция удалена', 3000)
    } else {
        store.showAlert('error', "Упс", 'Что-то пошло не так, попробуйте позже или обратитесь к администратору', 5000)
    } 
}
onMounted(async () => {
    let { data } = await supabase.from("instructions").select("*").eq("category", "Для лекторов")
    data ? instructions.value = data : []
})
</script>