<template>
    <div class="wrapper-cards">
    <Card v-for="item in store.currentUserData?.role == 'admin' ? startCardsAdmin : startCardsUser" :key="item.id" @click="router.push({name: item.routeName})">
        <template #title>{{ item.title }}</template>
        <template #content>
            <div class="wrapper-card">
                <p>{{ item.content }}</p>
                <img :src="item.image" alt="">
            </div>
        </template>
    </Card>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useMainStore } from '@/stores/mainStore';
import type { startCards } from '@/types/interfaces';
import { Card } from 'primevue';

const router = useRouter();
const store = useMainStore();

const startCardsAdmin = ref<startCards[]>([
    {   
        id: 1,
        title: "",
        content: "Управляйте пользователями в режиме онлайн от имени Администратора. Решайте какие инструкции и таблицы доступны для просмотра. Разрешайте и запрещайте доступ пользователям к проекту.",
        image: "/users.png",
        routeName: "users"
    },
    {
        id: 2,
        title: "",
        content: "Создавайте инструкции любого формата и форматируйте текст как вам нравится. Добавляйте таблицы и изменяйте их структуру. Используйте загруженные изображения для лучшей визуализации учебного материала.",
        image: "/instructions.png",
        routeName: "instructions_students"
    },
    {
        id: 3,
        title: "",
        content: "Создавайте и управляйте таблицей учета учебных часов пользователей для последующей оплаты. Выгружайте таблицу в формат Excel и продолжайте редактирование в привычной среде работы с таблицами.",
        image: "/timesheet.png",
        routeName: "timesheet"
    },
    {
        id: 4,
        title: "",
        content: "Создавайте расписания и наполняйте его различным контентом. Пользователям доступны варианты отображения расписания в двух визуализациях - списком, в котором содержится полная информация о учебном дне и карточками, где отображается сокращенная информация учебного дня. Пользуйтесь тем, что вам удобнее. Создавайте и управляйте специальными маркерами для выделения карточек.",
        image: "/schedule.png",
        routeName: "schedule"
    }
])
const startCardsUser = ref<startCards[]>([
    {
        id: 2,
        title: "",
        content: "Просматривайте инструкции с таблицами и изображениями для лучшего понимания учебного материала.",
        image: "/instructions.png",
        routeName: "instructions_students"
    },
    {
        id: 4,
        title: "",
        content: "Просматривайте расписания составленные для каждого учебного процесса. Пользователям доступны варианты отображения расписания в двух визуализациях - списком, в котором содержится полная информация о учебном дне и карточками, где отображается сокращенная информация учебного дня. Пользуйтесь тем, что вам удобнее.",
        image: "/schedule.png",
        routeName: "schedule"
    }
])
</script>

<style lang="scss">
.wrapper-cards {
    display: flex;
    flex-flow: row wrap;
    .p-card {
    margin: 10px;
    flex: 0 0 auto;
    justify-content: center;
    width: 49%;
    box-shadow: none !important;
    transition-property: transform;
    transition-duration: 0.3s;
    transition-timing-function: ease-in-out;
    &:hover {
        transform: scale(1.01);
        cursor: pointer;
    }
}
}
.wrapper-card {
    display: flex;
    flex-flow: row nowrap;
    p {
        margin: auto 0;
        margin-right: auto;
        padding-right: 30px;
        font-size: larger;
    }
    img {
        width: 450px;
    }
}
</style>