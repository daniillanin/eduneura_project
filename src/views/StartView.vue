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
                    Создавайте инструкции любого формата. Форматируйте текст так, как вам нравится. Добавляйте и преобразовывайте структуру таблиц и используйте загруженные вами изображения для лучшей визуализации учебного материала.
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
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque
            quas!Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque
            quas!
                </p>
                <img src="/users.png" alt="">
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
.p-card {
    margin: 10px;
    flex: 0 0 auto;
    justify-content: center;
    width: 49%;
    box-shadow: none !important;
}
</style>