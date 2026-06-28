<template>
    <Select v-model="selectedInstruction" :options="instructions" filter optionLabel="name" placeholder="Выберите инструкцию" style="width: 500px">
        <template #value="slotProps">
            <div v-if="slotProps.value" class="flex items-center">
                <div>{{ slotProps.value.name }}</div>
            </div>
            <span v-else>
                {{ slotProps.placeholder }}
            </span>
        </template>
    </Select>
    <AppInstruction :instructionID="selectedInstruction?.id"></AppInstruction>
    <AppNoData v-if="selectedInstruction == null"></AppNoData>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { supabase } from "@/database/supabase";
import type { Instruction } from "@/types/interfaces";
import AppInstruction from "@/components/AppInstruction/AppInstruction.vue";
import { Select } from 'primevue';
import AppNoData from '@/components/AppNoData/AppNoData.vue';

const instructions = ref<Instruction[]>([]);
const selectedInstruction = ref<Instruction | null>(null);

onMounted(async () => {
    let { data } = await supabase.from("instructions").select("*").eq("category", "Для лекторов")
    data ? instructions.value = data : []
})
</script>