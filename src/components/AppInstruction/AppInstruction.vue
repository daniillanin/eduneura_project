<template>
    <!-- ai контент -->
    <Dialog :visible="visibleAiContent" modal :closable="false" :style="{ width: '75rem' }" header="Перефраз">
        <template #default>
            <div v-html="aiContent"></div>
        </template>
        <template #footer>
            <Button severity="secondary" label="Закрыть" @click="visibleAiContent = false"></Button>
        </template>
    </Dialog>
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
        <div class="wrapper-edit-button">
            <Button text icon="pi pi-sparkles" label="Перефраз" severity="secondary" @click="ai" class="ai-button" :loading="aiLoading"></Button>
            <Button v-if="store.currentUserData?.role == 'admin'" text icon="pi pi-save" label="Сохранить изменения" severity="secondary" @click="safeEditContent"></Button>
            <Button v-if="store.currentUserData?.role == 'admin'" text icon="pi pi-cog" severity="secondary" @click="editInstruction"></Button>
        </div>
        <div class="wrapper-edit-content">
            <!-- контент для редакторов -->
            <AppEditor v-if="store.currentUserData?.role == 'admin'" :editContent="editContent" @emit-content="updateEditContent"></AppEditor>
            <!-- контент для читателей -->
            <div v-else v-html="editContent"></div>
        </div>
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
const visibleAiContent = ref(false)
const editContent = ref("")
const aiContent = ref("")
const aiLoading = ref(false)
const instructionName = ref("")
const instructionCategory = ref("")
const resolvePromise = ref<(value: string) => void>()

function updateEditContent(updateContent: string): void {
    editContent.value = updateContent
}
async function safeEditContent() :Promise<void> {
    const {data, error} = await supabase.from('instructions').update({ name: instructionName.value, category: instructionCategory.value, content: editContent.value }).eq('id', props.instructionID)
    if (!error) {
        store.showAlert('success', 'Успешно', 'Изменения сохранены', 3000)
    } else {
        store.showAlert('error', 'Ошибка', 'попробуйте повторить попытку позже или обратиться к администратору', 3000)
    }
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
async function ai() :Promise<void> {
    aiLoading.value = true
    const prompt = `Ты профессиональный учитель в крупной компании. Твоя задача обучить стажера который совсем недавно трудоустроился, только получает знания и наращивает экспертизу.
                    Перефразируй инструкцию в более понятном для нового сотрудника стиле с обязательным сохранением важных ключевых деталей и сократи ее объем от исходного таким образом чтобы она выглядела как краткий пересказ.
                    Данные: ${editContent.value}.
                    Ответ должен быть в формате HTML не используя теги <html>, <body>, <script>.`
    let response = await fetch("/mws-api/projects/eduneura/openai/v1/chat/completions", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_MWS_API_KEY}`
        },
        body: JSON.stringify({
            model: import.meta.env.VITE_MWS_AI_MODEL,
            messages: [{ role: "user", content: prompt }],
            // max_completion_tokens: 4000
        }
        )
    })
    try {
        let data = await response.json()
        let doneText = data.choices[0].message.content
        aiContent.value = doneText
        console.log(doneText)
        console.log(`В деньгах: ${data.usage.total_tokens * (1.22/1000)}`)
        visibleAiContent.value = true
        aiLoading.value = false
    } catch(error) {
        store.showAlert("error", "Упс!", "Что-то пошло не так, попробуйте повторить запрос", 10000)
        visibleAiContent.value = false
        aiLoading.value = false
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
 @use "./AppInstruction.scss";
</style>