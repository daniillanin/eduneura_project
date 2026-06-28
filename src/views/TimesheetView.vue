<template>
    <Select v-model="selectedTable" :options="tables" filter optionLabel="name" placeholder="Выберите таблицу" style="width: 500px">
        <template #value="slotProps">
            <div v-if="slotProps.value" class="flex items-center">
                <div>{{ slotProps.value.name }}</div>
            </div>
            <span v-else>
                {{ slotProps.placeholder }}
            </span>
        </template>
    </Select>
    <AppTable :tableID="selectedTable?.id"></AppTable>
    <AppNoData v-if="selectedTable == null"></AppNoData>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { supabase } from "@/database/supabase";
import type { TableMeta } from "@/types/interfaces";
import AppTable from '@/components/AppTable/AppTable.vue';
import { Select } from 'primevue';
import AppNoData from '@/components/AppNoData/AppNoData.vue';

const tables = ref<TableMeta[]>([]);
const selectedTable = ref<TableMeta | null>(null);

onMounted(async () => {
    let { data } = await supabase.from("tables_meta").select("*").eq("category", "Табель")
    data ? tables.value = data : [] 
})
</script>