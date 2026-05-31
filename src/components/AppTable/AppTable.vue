<template>
    <!-- изменение таблицы -->
    <Dialog :visible="visibleEditTable" modal :closable="false" :style="{ width: '25rem' }" header="Таблица">
        <template #default>
                <p>Введите новое название</p>
                <InputText v-model="tableName"/>
                <div class="wrapper-radio">
                    <p>Выберите категорию</p>
                    <label v-for="item in store.tableCategory" :key="item">
                        <span>{{ item }}</span>
                        <RadioButton v-model="tableCategory" :inputId="item" name="radio" :value="item" class="radio" :disabled="item === 'Общая'"/>
                    </label> 
                </div>
        </template>
        <template #footer>
            <Button severity="secondary" label="Отменить" @click="resolvePromise?.('Отменить')"></Button>
            <Button label="Сохранить" @click="resolvePromise?.('Сохранить')"></Button>
        </template>
    </Dialog>
    <!-- изменение столбца -->
    <Dialog :visible="visibleEditColumn" modal :closable="false" :style="{ width: '25rem' }" header="Столбец">
        <template #default>
            <div class="wrapper-dialog">
                <p>Введите новое название</p>
                <InputText v-model="columnName"/>
            </div>
        </template>
        <template #footer>
            <Button severity="secondary" label="Отменить" @click="resolvePromise?.('Отменить')"></Button>
            <Button label="Сохранить" @click="resolvePromise?.('Сохранить')"></Button>
        </template>
    </Dialog>
    <div class="wrapper-table">
    <div v-if="props.tableID">
        <div class="wrapper-edit-button">
            <div></div> <!-- не удалять, нужен в качестве противовеса выравнивания -->
            <Button text icon="pi pi-plus" severity="secondary" label="столбец" @click="createColumn"></Button>
            <Button text icon="pi pi-plus" severity="secondary" label="строка" @click="createRow" :disabled="!columns || columns.length == 0"></Button>
            <Button text icon="pi pi-download" severity="secondary" label=".csv" @click="exportCSV" :disabled="!columns || columns.length == 0"></Button>
            <Button text icon="pi pi-cog" severity="secondary" @click="editTable"></Button>
        </div>
        <DataTable :value="rows" editMode="cell" @cell-edit-complete="onCellEditComplete" ref="tableElement" stripedRows removableSort scrollable
        paginator :rows="10" :rowsPerPageOptions="[5, 10, 20, 50]"
        :pt="{ table: { style: 'min-width: 50rem' }, column: { bodycell: ({ state }: any) => ({class: [{ '!py-0': state['d_editing'] }]})}}">
            <Column v-for="(item, index) of columns" :key="item.id" :field="item.id" :header="item.header"
            style="min-width: 20rem; white-space: normal; word-break: break-word; vertical-align: top" sortable
            :frozen="index == 0 ? columnFrozen : false">
                <template #header="{ column }">
                    <div class="wrapper-edit-column-button">
                        <Button text icon="pi pi-chevron-left" severity="secondary" size="small" id="left" :disabled="index == 0" @click="shiftColumn($event, index)"></Button>
                        <Button text icon="pi pi-chevron-right" severity="secondary" size="small" id="right" @click="shiftColumn($event, index)"></Button>
                        <Button text icon="pi pi-pencil" severity="secondary" size="small" @click="editNameColumn(index)"></Button>
                        <Button text icon="pi pi-times" severity="secondary" size="small" @click="deleteColumn(index)"></Button>
                        <Button v-if="index == 0" text icon="pi pi-lock" severity="secondary" size="small" @click="columnFrozen = !columnFrozen"></Button>
                    </div>
                </template>
                <template #body="{ data, field }">
                    <div style="white-space: pre-wrap">{{ data[field as any] }}</div>
                </template>
                <template #editor="{ data, field }">
                    <Textarea v-model="data[field]" @keydown.enter.stop autoResize fluid></Textarea>
                </template>
            </Column>
            <Column v-if="rows" style="width: 30px">
                <template #body="{ index }">
                    <Button text icon="pi pi-times" severity="secondary" size="small" @click="deleteRow(index)"></Button>
                </template>
            </Column>
        </DataTable>
    </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useMainStore } from '@/stores/mainStore'
import { supabase } from '@/database/supabase'
import type { TableColumn, TableRow } from '@/types/interfaces'
import type { DataTableCellEditCompleteEvent } from 'primevue/datatable'
import { DataTable, Dialog, Column, InputText, Textarea, RadioButton, Button } from 'primevue'

const store = useMainStore()
const props = defineProps(["tableID"])

const visibleEditTable = ref(false)
const visibleEditColumn = ref(false)
const tableElement = ref()
const columnName = ref("")
const columnFrozen = ref(false)
const tableName = ref<string | null>(null)
const tableCategory = ref<string | null>(null)
const columns = ref<TableColumn[] | null>(null)
const rows = ref<TableRow[] | null>(null)
const resolvePromise = ref<(value: string) => void>()

function createColumn(): void {
    let column: TableColumn = {
        id: `column-${new Date().getTime()}`,
        header: "Без названия"
    }
    if (columns.value) {
        columns.value.push(column)
        updateColumns()
    } else {
        columns.value = []
        columns.value.push(column)
        updateColumns()
    }
}
function createRow(): void {
    let id_columns = []
    if (columns.value) {
        for (let item of columns.value) {                                           //перебор массива столбцов чтобы вытащить в отдельный массив названия столбцов которые на данный момент есть в таблице
            id_columns.push(item.id)
        }
        let row = Object.fromEntries(id_columns.map(key => [key, ""])) as TableRow  //каждому свойству присваивается пустое значение ""
        row.id = `row-${new Date().getTime()}`                                      //строке присваивается уникальный id потому что редактор определяет какую строку активировать по свойству id
        if (rows.value) {
            rows.value.push(row)
            updateRows()
        } else {
            rows.value = []
            rows.value.push(row)
            updateRows()
        }
    }  
}
async function updateTables(): Promise<void>{
    await supabase.from('tables_meta').update({ name: tableName.value, category: tableCategory.value}).eq('id', props.tableID)
}
async function updateColumns(): Promise<void>{
    await supabase.from('tables_columns').update({ columns: columns.value}).eq('id', props.tableID)
}
async function updateRows(): Promise<void>{
    await supabase.from('tables_rows').update({ rows: rows.value}).eq('id', props.tableID)
}
function shiftColumn(event: Event, index: number) {
    let target = event.currentTarget as HTMLElement
    if (columns.value && columns.value[index]) {
        let copy_column = columns.value[index]
        columns.value.splice(index, 1)
        switch (target.id) {
            case "right": 
                columns.value.splice(index + 1, 0, copy_column)
                break;
            case "left":
                columns.value.splice(index - 1, 0, copy_column)
                break;
        }
        updateColumns()
    }   
}
async function editTable(): Promise<void> {
    visibleEditTable.value = true
    let response = await new Promise<string>((resolve) => {
        resolvePromise.value = resolve
    })
    if (response == "Сохранить") {
        visibleEditTable.value = false
        updateTables()
    } else {
        visibleEditTable.value = false
    }
}
async function editNameColumn(index: number) {
    if (columns.value && columns.value[index]) { 
        columnName.value = columns.value[index].header
        visibleEditColumn.value = true
        let response = await new Promise<string>((resolve) => {
            resolvePromise.value = resolve
        })
        if (response == "Сохранить") {
            columns.value[index].header = columnName.value
            visibleEditColumn.value = false
            updateColumns()
        } else {
            visibleEditColumn.value = false
        }
    }  
}
const onCellEditComplete = (event: DataTableCellEditCompleteEvent) => {
    let { data, newValue, field } = event;
    newValue ? data[field] = newValue : data[field] = ""
    updateRows()
}
function deleteColumn(index: number): void {
    if (columns.value) {
        columns.value.splice(index, 1)
        updateColumns()
    }
}
function deleteRow(index: number): void {
    if (rows.value) {
        rows.value.splice(index, 1)
        updateRows()
    }
}
function exportCSV(): void {
    tableElement.value.exportCSV()
}
watch(() => props.tableID, async (tableID_actual) => {
    let table_meta = await supabase.from("tables_meta").select("*").eq("id", tableID_actual).single()
    let table_columns = await supabase.from("tables_columns").select("columns").eq("id", tableID_actual).single()
    let table_rows = await supabase.from("tables_rows").select("rows").eq("id", tableID_actual).single()
    if (table_meta.data) {
        tableName.value = table_meta.data.name
        tableCategory.value = table_meta.data.category
    }
    columns.value = table_columns.data ? table_columns.data.columns : null
    rows.value = table_rows.data ? table_rows.data.rows : null
})
</script>

<style scoped lang="scss">
@use "./AppTable.scss"
</style>