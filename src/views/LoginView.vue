<template>
    <Toast position="top-center" :base-z-index="1"/>
    <Dialog :visible="visible" modal :closable="false" header="Edit Profile" :style="{ width: '25rem' }">
        <template #header>
            <div class="block">
                Отправить ссылку для входа в приложение на почтовый ящик
            <span style="font-weight: bold">{{ userEmail }}</span>?
            </div>
        </template>
        <template #footer>
            <Button type="button" label="Нет" severity="secondary" @click="visible = false"></Button>
            <Button type="button" label="Да" @click="resetPassword"></Button>
        </template>
    </Dialog>
    <div class="wrapper">
        <div class="wrapper-icon">
            <img src="/eduneura_logo.png"/>
        </div>
        <form id="loginForm" class="form">
            <div class="field">
                <label for="email">Логин</label>
                <InputText id="email" v-model="userEmail"/>
                <Message size="small" severity="secondary" variant="simple">введите email</Message>
            </div>
            <div class="field">
                <label for="password">Пароль</label>
                <Password class="pwd" :overlayStyle="isRegistrationForm ? {display: 'none'} : undefined" v-model="userPassword" inputId="password" promptLabel="Введите пароль" weakLabel="Подумайте еще" mediumLabel="Уже хороший пароль" strongLabel="Уровень Сноудена" toggleMask />
                <Message size="small" severity="secondary" variant="simple">минимум 6 знаков</Message>
            </div>
            <div v-if="!isRegistrationForm" class="field">
                <div>
                    <label for="firstName">Имя</label>
                    <InputText id="firstName" v-model="userFirstName"/>
                    <Message size="small" severity="secondary" variant="simple">введите имя</Message>
                </div>
                <div>
                    <label for="lastName">Фамилия</label>
                    <InputText id="lastName" v-model="userLastName"  />
                    <Message size="small" severity="secondary" variant="simple">введите фамилию</Message>
                </div>
            </div>
            <div v-if="isRegistrationForm" class="wrapper-button">
                <Button class="btn-login" @click="signIn" severity="secondary">Войти</Button>
                <a @click.prevent="isRegistrationForm = !isRegistrationForm" href="#">Зарегистрироваться</a> 
                <a @click.prevent="visible = true" href="#">Сброс пароля</a>
            </div>
            <div v-else class="wrapper-button">
                <Button class="btn-login" @click="signUp" severity="secondary">Зарегистрироваться</Button>
                <a @click.prevent="isRegistrationForm = !isRegistrationForm" href="#">Войти в систему</a> 
            </div>                                                                                                            
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useMainStore } from '@/stores/mainStore'
import { supabase } from '@/database/supabase'
import type { User } from '@/types/interfaces'
import { Dialog, Button, InputText, Message, Password, Toast } from "primevue"

const store = useMainStore()
const router = useRouter()

const userEmail = ref("")
const userPassword = ref("")
const userFirstName = ref("")
const userLastName = ref("")
const visible = ref(false)
const isRegistrationForm = ref(true)

async function signUp(): Promise<void>{
    if (!userFirstName.value || !userLastName.value) {
        store.showAlert('error', 'Ошибка' ,'Поля "Имя и "Фамиилия" не могут быть пустыми', 5000)
        return
    }
    const { data, error } = await supabase.auth.signUp({
        email: userEmail.value,
        password: userPassword.value,
    })
    if (!error) {
        let currentUser = await supabase.auth.getUser();
        if (currentUser.data.user) {
            let newUser: User = {
                id: currentUser.data.user.id,
                first_name: userFirstName.value,
                last_name: userLastName.value,
                avatar: "/avatar_default.jpg",
                role: 'user',
                active: true,
                schedules: null,
                instructions: null
            }
            await supabase.from("profiles").upsert(newUser).select("*")
        }
        store.showAlert('success', 'Успешно' ,'Пользователь зарегистрирован', 5000)
        const { data } = await supabase.auth.getUser()
        const user = await supabase.from("profiles").select('*').eq('id', data.user?.id).single()
        store.currentUserData = user.data
        router.push({ name: 'main' })
    } else {
        store.showAlert('error', 'Ошибка' ,'Неверный формат email или пароль ', 5000)
    }
}
async function signIn(): Promise<void> {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: userEmail.value,
        password: userPassword.value,
    })
    if (!error) {
        store.showAlert('success', 'Успешно' ,'Успешный вход', 5000)
        const { data } = await supabase.auth.getUser()
        const user = await supabase.from("profiles").select('*').eq('id', data.user?.id).single()
        store.currentUserData = user.data
        router.push({ name: 'main' })
    } else {
        store.showAlert('error', 'Ошибка' ,'Неверный логин или пароль', 5000)
    }
}
async function resetPassword(): Promise<void> {
    const { data, error } = await supabase.auth.resetPasswordForEmail(userEmail.value, {
        redirectTo: 'http://localhost:3000/resetpassword'
    })
    if (!error) {
        store.showAlert('success', 'Успешно' ,'Ссылка на сброс пароля отправлена на указанный email', 5000)
        visible.value = false
    } else {
        store.showAlert('error', 'Ошибка' ,'Сервис временно недоступен. Попробуйте позже', 5000)
    }
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
    background-image: url("/main_background.png");
    background-size: contain;
    background-repeat: no-repeat;
    background-position-x: center;
    background-position-y: center;
}
.wrapper-button {
    display: flex;
    flex-flow: column nowrap;
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
    div:nth-child(1){
        margin-bottom: 10px;
    }
}
input{
    margin: 5px 0px;
    width: 100%;
}
.btn-login{
    margin: 10px 0px;
    background-color: rgb(96, 165, 250);
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
.block {
    font-size: 1.1rem;
    margin: 10px;
    border-radius: 5px;
    span {
        font-size: 1.1rem;
    }
}
</style>