<template>
    <Dialog :visible="isModalOpen" modal :closable="false" :style="{ width: '75rem' }" header="Редактирование карточки">
        <h4>Изображение</h4>
        <div class="wrapper-dialog-image">
            <input ref="inputElem" type="file" accept="image/jpg"></input>
        </div>
        <h4>Заголовок</h4>
        <div class="wrapper-dialog-title">
            <input v-model="mEditTitle"></input>
        </div>
        <h4>Контент</h4>
        <div class="wrapper-dialog-content">
            <AppEditor :editContent="mEditContent" @emit-content="updateEditContent"></AppEditor>
        </div>
        <h4>Маркеры</h4>
        <div class="wrapper-dialog-markers">
            <label
            v-for="item in markers">
                <span>{{ item.title }}</span>
                <Checkbox v-model="mEditMarkers" :value="item.id" class="checkbox" name="checkbox"></Checkbox>
            </label>
        </div>
        <div class="wrapper-dialog-btn">
            <Button label="Отменить" severity="secondary" @click="resolvePromise?.('Отменить')"></Button>
            <Button label="Сохранить" severity="primary" @click="resolvePromise?.('Сохранить')"></Button>
        </div>
    </Dialog>
    <div class="wrapper-card">
        <AppCard
            v-for="(item, index) in lessons"
            :key="item.id"
            :dataCard="item"
            :indexCard="index"
            class="card"
            @edit-card="editCard"
            @delete-card="deleteCard"
            @shift-card-right="shiftCardRight"
            @shift-card-left="shiftCardLeft">
        </AppCard>
        
        <div class="newcard" @click="createCard">
            +
        </div>
    </div>
</template>

<script setup lang="ts">
import { watch, onMounted, ref, inject, nextTick } from 'vue';
import { useMainStore } from '@/stores/mainStore';
import { supabase } from '@/database/supabase';
import type { Lesson, Marker } from '@/types/interfaces';
import AppCard from '@/components/AppCard/AppCard.vue';
import AppEditor from '@/components/AppEditor/AppEditor.vue';
import { Dialog, Button } from 'primevue';
import Checkbox from 'primevue/checkbox';

const store = useMainStore();

const props = defineProps(["scheduleID"])
const markers = inject<Marker[]>("markers")

const isModalOpen = ref(false)
const lessons = ref<Lesson[]>([])
const mEditContent = ref<string | undefined>("")
const mEditTitle = ref<string | undefined>("")
const mEditMarkers = ref<string[] | undefined>([])
const inputElem = ref<HTMLInputElement>()
const resolvePromise = ref<(value: string) => void>()

function updateEditContent(updateContent: string): void {
  mEditContent.value = updateContent
}
function createCard(): void {
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
    updateCards()
}
async function editCard(index: number): Promise<void>{

    mEditContent.value = lessons.value[index]?.content_card
    mEditTitle.value = lessons.value[index]?.title
    mEditMarkers.value = lessons.value[index]?.markers
    isModalOpen.value = true
    await nextTick()
    let response = await new Promise<string>((resolve) => {
        resolvePromise.value = resolve
    })
    if (response == "Сохранить") {
        if (lessons.value[index]) { //проверка на undefined для TS
            lessons.value[index].content_card = mEditContent.value!
            lessons.value[index].title = mEditTitle.value!
            lessons.value[index].markers = mEditMarkers.value!
            if (inputElem.value?.files?.[0]) {
                let file = inputElem.value.files[0]
                let id = new Date().getTime()
                await supabase.storage.from("eduneura-bucket").upload(`schedules/image-${id}.jpg`, file, {cacheControl: '3600'})
                const imgURL = await supabase.storage.from("eduneura-bucket").getPublicUrl(`schedules/image-${id}.jpg`)
                lessons.value[index].image = imgURL.data.publicUrl
            }
            isModalOpen.value = false
            updateCards()
        } else {
            return //если будет undefined то будет выход из функции
        }
    } else if (response == "Отменить") {
        isModalOpen.value = false
    }
}
async function deleteCard(index: number): Promise<void> {
    lessons.value.splice(index, 1)
    updateCards()
}
function shiftCardRight(index: number): void {
    let current_card = lessons.value[index];
    lessons.value.splice(index, 1);
    lessons.value.splice(index + 1, 0, current_card!);
    updateCards()
}
function shiftCardLeft(index: number): void {
    if (index != 0) {
        let current_card = lessons.value[index];
        lessons.value.splice(index, 1);
        lessons.value.splice(index - 1, 0, current_card!);
    } 
    updateCards()
}
async function updateCards() :Promise<void> {
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
@use "./AppScheduleCards.scss"
</style>