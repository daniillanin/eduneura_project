<template>
    <!-- изменение инструкции -->
    <Dialog :visible="visibleEditInstruction" modal :closable="false" :style="{ width: '25rem' }" header="Инструкция">
        <template #default>
                <p>Введите новое название</p>
                <InputText v-model="instructionName"/>
                <div class="wrapper-radio">
                    <p>Выберите категорию</p>
                    <label v-for="item in store.instructionsCategory" :key="item">
                        <span>{{ item }}</span>
                        <RadioButton v-model="instructionCategory" :inputId="item" name="radio" :value="item" class="radio"/>
                    </label> 
                </div>
        </template>
        <template #footer>
            <Button severity="secondary" label="Отменить" @click="resolvePromise?.('Отменить')"></Button>
            <Button label="Сохранить" @click="resolvePromise?.('Сохранить')"></Button>
        </template>
    </Dialog>
    <div v-if="props.instructionID">
        <div v-if="store.currentUserData?.role == 'admin'" class="wrapper-edit-button">
            <Button text icon="pi pi-save" label="Сохранить изменения" severity="secondary" @click="safeEditContent"></Button>
            <Button text icon="pi pi-cog" severity="secondary" @click="editInstruction"></Button>
        </div>
        <!-- контент для редакторов -->
        <AppEditor v-if="store.currentUserData?.role == 'admin'" :editContent="editContent" @emit-content="updateEditContent"></AppEditor>
        <!-- контент для читателей -->
        <div v-else v-html="editContent"></div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useMainStore } from '@/stores/mainStore';
import { supabase } from '@/database/supabase';
import AppEditor from '@/components/AppEditor/AppEditor.vue';
import { Dialog, InputText, RadioButton, Button } from 'primevue';

const store = useMainStore()
const props = defineProps(["instructionID"])

const visibleEditInstruction = ref(false)
const editContent = ref("")
const instructionName = ref("")
const instructionCategory = ref("")
const resolvePromise = ref<(value: string) => void>()

function updateEditContent(updateContent: string): void {
  editContent.value = updateContent
}
async function safeEditContent() :Promise<void> {
    await supabase.from('instructions').update({ name: instructionName.value, category: instructionCategory.value, content: editContent.value }).eq('id', props.instructionID)
}
async function editInstruction() :Promise<void> {
    visibleEditInstruction.value = true
    let response = await new Promise<string>((resolve) => {
        resolvePromise.value = resolve
    })
    if (response == "Сохранить") {
        visibleEditInstruction.value = false
        await supabase.from('instructions').update({ name: instructionName.value, category: instructionCategory.value}).eq('id', props.instructionID)
    } else {
        visibleEditInstruction.value = false
    }
}
watch(() => props.instructionID, async (instructionID_actual) => {
    const instructions = await supabase.from("instructions").select("*").eq("id", instructionID_actual).single()
    instructionName.value = instructions.data.name
    instructionCategory.value = instructions.data.category
    editContent.value = instructions.data.content
})
</script>

<style scoped lang="scss">
 @use "./AppInstruction.scss"
</style>