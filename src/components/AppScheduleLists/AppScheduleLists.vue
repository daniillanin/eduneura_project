<template>
    <Dialog :visible="isModalOpen" modal :closable="false" :style="{ width: '75rem' }" header="Редактирование списка">
        <h4>Заголовок</h4>
        <div class="wrapper-dialog-title">
            <input v-model="mEditTitle"></input>
        </div>
        <h4>Контент</h4>
        <div class="wrapper-dialog-content">
            <AppEditor :editContent="mEditContent" @emit-content="updateEditContent"></AppEditor>
        </div>
        <div class="wrapper-dialog-btn">
            <Button label="Отменить" severity="secondary" @click="resolvePromise?.('Отменить')"></Button>
            <Button label="Сохранить" severity="primary" @click="resolvePromise?.('Сохранить')"></Button>
        </div>
    </Dialog>
    <div class="wrapper-panel">
    <Panel v-for="(item, index) in lessons" :key="item.id" toggleable :collapsed="true">
        <template #header>
            {{ item.title }}
        </template>
        <template #icons v-if="store.currentUserData?.role == 'admin'">
            <Button text icon="pi pi-chevron-up" severity="secondary" id="up" :disabled="index == 0" @click="shiftLesson($event, index)"></Button>
            <Button text icon="pi pi-chevron-down" severity="secondary" id="down" @click="shiftLesson($event, index)"></Button>
            <Button text icon="pi pi-pencil" severity="secondary" @click="editLesson(index)"></Button>
            <Button text icon="pi pi-times" severity="secondary" @click="deleteLesson(index)"></Button>
        </template>
        <div v-html="item.content_list "></div>
        <!-- <template #footer>
        </template> -->
    </Panel>
    <Button v-if="store.currentUserData?.role == 'admin'" text icon="pi pi-plus" severity="secondary" @click="createLesson"></Button>
    </div>
</template>

<script setup lang="ts">
import { watch, ref, onMounted } from 'vue'
import { useMainStore } from '@/stores/mainStore'
import { supabase } from '@/database/supabase'
import type { Lesson } from '@/types/interfaces'
import AppEditor from '@/components/AppEditor/AppEditor.vue'
import { Dialog, Button, Panel } from 'primevue'

const store = useMainStore()

const props = defineProps(["scheduleID"])

const isModalOpen = ref(false)
const lessons = ref<Lesson[]>([])
const mEditContent = ref<string | undefined>("");
const mEditTitle = ref<string | undefined>("");
const resolvePromise = ref<(value: string) => void>()

function updateEditContent(updateContent: string): void {
  mEditContent.value = updateContent
}
function createLesson(): void {
    let new_lesson: Lesson = {
        id: `lesson-${new Date().getTime()}`,
        image: "/new_card.jpg",
        title: "Название",
        subtitle: "",
        content_card: "Контент",
        content_list: "Контент",
        markers: []
    };
    lessons.value.push(new_lesson)
    updateLessons()
}
async function editLesson(index: number): Promise<void>{
    mEditContent.value = lessons.value[index]?.content_list;
    mEditTitle.value = lessons.value[index]?.title;
    isModalOpen.value = true;
    let response = await new Promise<string>((resolve) => {
        resolvePromise.value = resolve
    })
    if (response == "Сохранить") {
        if (lessons.value[index]) {
            lessons.value[index].title = mEditTitle.value!
            lessons.value[index].content_list = mEditContent.value!
            isModalOpen.value = false
            updateLessons()
        } else {
            return //если будет undefined то будет выход из функции
        }
    } else if (response == "Отменить") {
        isModalOpen.value = false
    }
}
async function deleteLesson(index: number): Promise<void> {
    lessons.value.splice(index, 1)
    updateLessons()
}
function shiftLesson(event: Event, index: number): void {
    let target = event.currentTarget as HTMLButtonElement
    let current_lesson = lessons.value[index]
    lessons.value.splice(index, 1)
    switch (target.id) {
        case "down": 
            lessons.value.splice(index + 1, 0, current_lesson!)
            break;
        case "up":
                lessons.value.splice(index - 1, 0, current_lesson!)
            break;
    } 
    updateLessons()
}
async function updateLessons(): Promise<void> {
    await supabase.from('schedules').update({ lessons: lessons.value}).eq('id', props.scheduleID)
}
onMounted(async () => {
    let schedule = await supabase.from("schedules").select("*").eq("id", props.scheduleID).single()
    schedule.data.lessons ? lessons.value = schedule.data.lessons : []
})
watch(() => props.scheduleID, async (scheduleID_actual) => {
    let schedule = await supabase.from("schedules").select("*").eq("id", scheduleID_actual).single()
    schedule.data.lessons ? lessons.value = schedule.data.lessons : []
})
</script>

<style scoped lang="scss">
@use "./AppScheduleLists.scss"
</style>