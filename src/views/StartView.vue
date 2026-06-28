<template>
    <div class="wrapper-cards">
    <Card>
        <!-- <template #title>Simple Card</template> -->
        <template #content>
            <div class="wrapper-card">
                <p>
                Управляйте пользователями в режиме онлайн от имени Администратора. Решайте какие инструкции и таблицы доступны для просмотра. Разрешайте и запрещайте доступ пользователям к проекту.
                </p>
                <img src="/users.png" alt="">
            </div>
        </template>
    </Card>
    <Card>
        <!-- <template #title>Simple Card</template> -->
        <template #content>
            <div class="wrapper-card">
                <p>
                Создавайте инструкции любого формата и форматируйте текст как вам нравится. Добавляйте таблицы и изменяйте их структуру. Используйте загруженные изображения для лучшей визуализации учебного материала.
                </p>
                <img src="/instructions.png" alt="">
            </div>
        </template>
    </Card>
    <Card>
        <!-- <template #title>Simple Card</template> -->
        <template #content>
            <div class="wrapper-card">
                <p>
                Создавайте и управляйте таблицей учета учебных часов пользователей для последующей оплаты. Выгружайте таблицу в формат Excel и продолжайте редактирование в привычной среде работы с таблицами.
                </p>
                <img src="/timesheet.png" alt="">
            </div>
        </template>
    </Card>
    <Card>
        <!-- <template #title>Simple Card</template> -->
        <template #content>
            <div class="wrapper-card">
                <p>
                    Создавайте расписания и наполняйте его различным контентом. Пользователям доступны варианты отображения расписания в двух синхронных визуализациях - списком, в котором содержится полная информация о учебном дне и карточками, где отображается сокращенная информация учебного дня. Пользуйтесь тем, что вам удобнее. Создавайте и управляйте специальными маркерами для выделения карточек.
                </p>
                <img src="/schedule.png" alt="">
            </div>
        </template>
    </Card>
    </div>
</template>

<script setup lang="ts">
import { Card } from 'primevue';
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