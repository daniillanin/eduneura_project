<template>
    <Toast position="top-center" :base-z-index="1"/>
    <div class="wrapper">
        <div class="wrapper-icon">
            <img src="/eduneura_logo.png"/>
        </div>
        <form id="loginForm" class="form">
            <div class="field">
                <label for="password">Новый пароль</label>
                <Password class="pwd" v-model="userPassword" inputId="password" promptLabel="Введите пароль" weakLabel="Подумайте еще" mediumLabel="Уже хороший пароль" strongLabel="Уровень Сноудена" toggleMask />
                <Message size="small" severity="secondary" variant="simple">минимум 6 знаков</Message>
            </div>
            <div class="wrapper-button">
                <Button @click="updatePassword" severity="secondary">Сохранить</Button>
            </div>                                                                                                           
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import router from '@/router';
import { supabase } from '@/database/supabase';
import { Button, Message, Password, Toast } from "primevue";

const userPassword = ref("")

async function updatePassword(): Promise<void> {
    const { data, error } = await supabase.auth.updateUser({
        password: userPassword.value
    })
    router.push({ name: 'main' })
}
</script>

<style scoped lang="scss">
* {
    font-size: 14px;
    box-sizing: border-box;
}
label {
    font-weight: 500;
}
.wrapper-icon img {
    width: 200px;
}
.wrapper-icon {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    margin-bottom: 40px;
}
.p-password{
    width: 100%;
}
.wrapper {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    height: 98vh;
    min-height: 300px;
}
.wrapper-button {
    display: flex;
    flex-flow: column nowrap;
    margin-top: 15px;
    align-items: center;
}
#loginForm {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    width: 350px;
    padding: 35px;
    border-radius: 30px;
    box-shadow: 0px 0px 35px rgba(70, 71, 71, 0.22);
    transition-property: box-shadow;
    transition-duration: 3s;
    transition-timing-function: ease-in-out;
}
.form {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center; 
} 
.field {
    margin-bottom: 10px;
    width: 100%;
}
input{
    margin: 5px 0px;
    width: 100%;
}
#loginForm:hover {
    box-shadow: 0px 0px 25px rgb(96, 165, 250);
}
.p-inputwrapper {
    display: grid;
}
.pwd {
    margin: 5px 0px;
}
</style>