<template>
  <Toast position="top-center" :base-z-index="1"/>
  <!-- редактирование профиля -->
  <Dialog :visible="visibleEditProfile" modal :closable="false" :style="{ width: '25rem' }" header="Профиль">
    <template #default>
      <div class="wrapper-dialog">
        <div class="wrapper-dialog-avatar">
          <img :src="currentUserData?.avatar" @click="inputElem?.click">
          <p v-if="uploadImage">изображение выбрано</p>
          <input ref="inputElem" type="file" accept="image/jpg" @change="controlUploadFile"></input>
        </div>
        <p>Имя</p>
        <InputText v-model="currentUserFirstName"/>
        <p>Фамилия</p>
        <InputText v-model="currentUserLastName"/>
        <!-- <p>Новый email</p>
        <InputText v-model="currentUserEmail"/>
        <p>Новый пароль</p>
        <InputText v-model="currentUserNewPassword"/> -->
      </div>
    </template>
    <template #footer>
      <Button severity="secondary" label="Отменить" @click="resolvePromise?.('Отменить')"></Button>
      <Button label="Сохранить" @click="resolvePromise?.('Сохранить')"></Button>
    </template>
  </Dialog>
  <!-- создание таблицы -->
  <Dialog :visible="visibleCreateTable" modal :closable="false" :style="{ width: '25rem' }" header="Таблица">
        <template #default>
            <div class="wrapper-dialog">
                <p>Введите название</p>
                <InputText v-model="tableName"/>
                <div class="wrapper-radio">
                    <p>Выберите категорию</p>
                    <label v-for="item in store.tableCategory" :key="item">
                        <span>{{ item }}</span>
                        <RadioButton v-model="tableCategory" :inputId="item" name="radio" :value="item" class="radio" :disabled="item === 'Общая'"/>
                    </label> 
                </div>
            </div>
        </template>
        <template #footer>
            <Button severity="secondary" label="Отменить" @click="resolvePromise?.('Отменить')"></Button>
            <Button label="Сохранить" @click="resolvePromise?.('Сохранить')" :disabled="!tableCategory"></Button>
        </template>
    </Dialog>
    <!-- создание инструкции -->
    <Dialog :visible="visibleCreateInstruction" modal :closable="false" :style="{ width: '25rem' }" header="Инструкция">
        <template #default>
            <div class="wrapper-dialog">
                <p>Введите название</p>
                <InputText v-model="instructionName"/>
                <div class="wrapper-radio">
                    <p>Выберите категорию</p>
                    <label v-for="item in store.instructionsCategory" :key="item">
                        <span>{{ item }}</span>
                        <RadioButton v-model="instructionCategory" :inputId="item" name="radio" :value="item" class="radio"/>
                    </label> 
                </div>
            </div>
        </template>
        <template #footer>
            <Button severity="secondary" label="Отменить" @click="resolvePromise?.('Отменить')"></Button>
            <Button label="Сохранить" @click="resolvePromise?.('Сохранить')" :disabled="!instructionCategory"></Button>
        </template>
    </Dialog>
    <!-- создание расписания -->
    <Dialog :visible="visibleCreateSchedule" modal :closable="false" :style="{ width: '25rem' }" header="Расписание">
        <template #default>
            <div class="wrapper-dialog">
                <p>Введите название</p>
                <InputText v-model="scheduleName"/>
                <!-- <div class="wrapper-radio">
                    <p>Выберите категорию</p>
                    <label v-for="item in store.scheduleCategory" :key="item">
                        <span>{{ item }}</span>
                        <RadioButton v-model="scheduleCategory" :inputId="item" name="radio" :value="item" class="radio"/>
                    </label> 
                </div> -->
            </div>
        </template>
        <template #footer>
            <Button severity="secondary" label="Отменить" @click="resolvePromise?.('Отменить')"></Button>
            <Button label="Сохранить" @click="resolvePromise?.('Сохранить')"></Button>
        </template>
    </Dialog>
    <!-- создание маркера -->
    <Dialog :visible="visibleCreateMarker" modal :closable="false" :style="{ width: '50rem' }" header="Маркер">
      <template #default>
        <div class="wrapper-dialog">
          <p>Введите название</p>
          <InputText v-model="markerTitle"/>
          <div class="wrapper-color">
            <p>Выберите цвет</p>
            <ColorPicker v-model="markerColor" format="hex" inline/>
            <p class="color-block" :style="{backgroundColor: '#'+markerColor}">Пример</p>
          </div>
        </div>
      </template>
      <template #footer>
        <Button label="Отменить" severity="secondary" @click="resolvePromise?.('Отменить')"></Button>
        <Button label="Сохранить" severity="primary" @click="resolvePromise?.('Сохранить')" :disabled="!markerTitle"></Button>
      </template>
    </Dialog>
    <!-- редактирование маркеров -->
    <Dialog :visible="visibleEditMarkers" modal :closable="false" :style="{ width: '50rem' }" header="Редактирование маркеров">
      <template #default>
        <div v-for="(item, index) in markers" :key="item.id" class="wrapper-dialog-markers">
          <div class="wrapper-markers">
            <InputText v-model="item.title"/>
            <ColorPicker v-model="item.color" format="hex"/>
            <Button text icon="pi pi-trash" severity="secondary" @click="deleteMarker(index)"></Button>
          </div>
        </div>
      </template>
      <template #footer>
        <Button label="Отменить" severity="secondary" @click="resolvePromise?.('Отменить')"></Button>
        <Button label="Сохранить" severity="primary" @click="resolvePromise?.('Сохранить')"></Button>
      </template>
    </Dialog>
    <Dialog :visible="visibleDeleteMarker" modal :closable="false" header="Удалить маркер?" :style="{ width: '25rem' }">
        <template #default>
            <p>Если удалить маркер, то его будет невозможно восстановить. Все равно удалить маркер?</p>
        </template>
        <template #footer>
            <Button type="button" label="Нет" severity="secondary" @click="resolvePromiseConfirm?.('Нет')"></Button>
            <Button type="button" label="Да" @click="resolvePromiseConfirm?.('Да')"></Button>
        </template>
    </Dialog>
  <Menubar :model="itemsMenuBar">
    <template #start>
      <img src="/eduneura_logo.png" width="140px" @click="router.push({name: 'main'})">
    </template>
    <template #end>
        <button @click="visible = !visible">
            <Avatar :image="currentUserData?.avatar" shape="circle" size="normal"
            :pt="{ image: { style: 'object-position: center; object-fit: cover' } }"/>
            <div class="wrapper-text-avatar">
                <span>{{ currentUserFirstName + " " + currentUserLastName }}</span>
                <span>{{ showUserRole() }}</span>
            </div>
        </button>
    </template>
  </Menubar>
  <Drawer :visible="visible" @update:visible="visible = !visible" position="right">
    <template #header>
      <Avatar :image="currentUserData?.avatar" shape="circle" size="large"
      :pt="{ image: { style: 'object-position: center; object-fit: cover' } }"/>
            <div class="wrapper-text-avatar">
                <span style="font-weight: bold">{{ currentUserFirstName + " " + currentUserLastName }}</span>
                <br>
                <span>{{ showUserRole() }}</span>
            </div>
    </template>
    <PanelMenu :model="itemsPanelBar"/>
    <template #footer>
      <Button label="Профиль" icon="pi pi-cog" class="flex-auto" severity="secondary" text @click="editProfile"></Button>
      <Button label="Выйти" icon="pi pi-sign-out" class="flex-auto" severity="danger" text @click="signOut"></Button>
    </template>
  </Drawer>
</template>

<script setup lang="ts">
import { onBeforeMount ,ref, nextTick, watch } from "vue"
import { useRoute, useRouter } from 'vue-router'
import { useMainStore } from "@/stores/mainStore"
import { supabase } from "@/database/supabase"
import type { User, Marker, MenuBar, PanelBar } from "@/types/interfaces"
import type { MenuItemCommandEvent } from "primevue/menuitem"
import { Menubar, Button, InputText, Dialog, RadioButton, ColorPicker, Toast } from "primevue"
import PanelMenu from 'primevue/panelmenu'
import Drawer from 'primevue/drawer'
import Avatar from 'primevue/avatar'

const router = useRouter()
const route = useRoute()
const store = useMainStore()

const visible = ref(false)
const visibleCreateTable = ref(false)
const visibleCreateInstruction = ref(false)
const visibleCreateSchedule = ref(false)
const visibleEditProfile = ref(false)
const visibleCreateMarker = ref (false)
const visibleEditMarkers = ref(false)
const visibleDeleteMarker = ref(false)
const instructionName = ref("")
const instructionCategory = ref("")
const scheduleName = ref("")
const scheduleCategory = ref("")
const markerTitle = ref("")
const markerColor = ref("")
const tableName = ref("")
const tableCategory = ref("")
const currentUserData = ref<User>()
const currentUserEmail = ref("")
const currentUserFirstName = ref("")
const currentUserLastName = ref("")
const currentUserNewPassword = ref("")
const resolvePromise = ref<(value: string) => void>()
const resolvePromiseConfirm = ref<(value: string) => void>()
const inputElem = ref<HTMLInputElement>()
const uploadImage = ref<File | null>(null)
const markers = ref<Marker[] | null>(null)

const itemsMenuBar = ref<MenuBar[]>([
  {
      label: 'Графики',
      icon: 'pi pi-calendar',
      items: [
        {
          label: 'График лекторов',
          icon: 'pi pi-briefcase',
          command: clickItemNavBar
        },
        {
          label: 'График поддержки',
          icon: 'pi pi-comments',
          command: clickItemNavBar
        },
      ]
    },
    {
      label: 'Расписание',
      icon: 'pi pi-clipboard',
      command: clickItemNavBar
    },
    {
      label: 'Табель',
      icon: 'pi pi-table',
      command: clickItemNavBar
    },
    {
      label: 'Инструкции',
      icon: 'pi pi-book',
      items: [
        {
          label: 'Для студентов',
          icon: 'pi pi-graduation-cap',
          command: clickItemNavBar
        },
        {
          label: 'Для лекторов',
          icon: 'pi pi-briefcase',
          command: clickItemNavBar
        },
      ]
    },
]);
const itemsPanelBar = ref<PanelBar[]>([
  {
    label: 'Таблицы',
    icon: 'pi pi-table',
    items: [
      {
        label: 'Создать таблицу',
        icon: 'pi pi-plus',
        command: clickItemPanelBar
      }
    ]
  },
  {
    label: 'Инструкции',
    icon: 'pi pi-book',
    items: [
      {
        label: 'Создать инструкцию',
        icon: 'pi pi-plus',
        command: clickItemPanelBar
      }
    ]
  },
  {
    label: 'Расписание',
    icon: 'pi pi-clipboard',
    items: [
      {
        label: 'Создать расписание',
        icon: 'pi pi-plus',
        command: clickItemPanelBar
      },
      {
        label: 'Маркеры',
        icon: 'pi pi-circle',
        items: [
          {
          label: 'Создать маркер',
          icon: 'pi pi-plus',
          command: clickItemPanelBar
          },
          {
          label: 'Изменить маркеры',
          icon: 'pi pi-pencil',
          command: clickItemPanelBar
          }
        ]
      }
    ]
  },
])
function clickItemPanelBar(event: MenuItemCommandEvent): void {
  switch (event.item.label) {
    case "Создать таблицу":
      createTable()
      break;
    case "Создать инструкцию":
      createInstruction()
      break;
    case "Создать расписание":
      createSchedule()
      break;
    case "Создать маркер":
      createMarker()
      break;
    case "Изменить маркеры":
      editMarkers()
      break;
  }
}
function clickItemNavBar(event: MenuItemCommandEvent): void {  
  switch (event.item.label) {
    case "Расписание":
      router.push({ name: 'schedule' })
      break;
    case "Табель":
      router.push({ name: 'timesheet' })
      break;
    case "График поддержки":
      router.push({ name: 'support' })
      break;
    case "График лекторов":
      router.push({ name: 'lectors' })
      break;
    case "Для студентов":
      router.push({ name: 'instructions_students' })
      break;
    case "Для лекторов":
      router.push({ name: 'instructions_lectors' })
      break;
  }
}
async function createTable(): Promise<void>{
  visibleCreateTable.value = true
  let response = await new Promise<string>((resolve) => {
    resolvePromise.value = resolve
  })
  if (response == "Сохранить") {
    let id_table = `table-${new Date().getTime()}`
    await supabase.from('tables_meta').insert({ id: id_table, name: tableName.value, category: tableCategory.value })
    await supabase.from('tables_columns').insert({ id: id_table, columns: null })
    await supabase.from('tables_rows').insert({ id: id_table, rows: null })
    visibleCreateTable.value = false
    store.showAlert('success', 'Успешно', 'Для работы с созданным элементом обновите страницу', 10000)
  } else if (response == "Отменить") {
    visibleCreateTable.value = false
  }
}
async function createInstruction(): Promise<void>{
  visibleCreateInstruction.value = true
  let response = await new Promise<string>((resolve) => {
    resolvePromise.value = resolve
  })
  if (response == "Сохранить") {
    let id_instruction = `instruction-${new Date().getTime()}`
    await supabase.from('instructions').insert({ id: id_instruction, name: instructionName.value, category: instructionCategory.value, content: "<p>Контент</p>"})
    visibleCreateInstruction.value = false
    store.showAlert('success', 'Успешно', 'Для работы с созданным элементом обновите страницу', 10000)
  } else if (response == "Отменить") {
    visibleCreateInstruction.value = false
  }
}
async function createSchedule(): Promise<void>{
  visibleCreateSchedule.value = true
  let response = await new Promise<string>((resolve) => {
    resolvePromise.value = resolve
  })
  if (response == "Сохранить") {
    let id_schedule = `schedule-${new Date().getTime()}`
    await supabase.from('schedules').insert({ id: id_schedule, name: scheduleName.value, category: "Общая", lessons: []})
    visibleCreateSchedule.value = false
    store.showAlert('success', 'Успешно', 'Для работы с созданным элементом обновите страницу', 10000)
  } else if (response == "Отменить") {
    visibleCreateSchedule.value = false
  }
}
async function createMarker(): Promise<void>{
  visibleCreateMarker.value = true
  let response = await new Promise<string>((resolve) => {
    resolvePromise.value = resolve
  })
  if (response == "Сохранить") {
    let id_marker = `marker-${new Date().getTime()}`
    await supabase.from('schedule_cards_markers').insert({ id: id_marker, title: markerTitle.value, color: markerColor.value })
    visibleCreateMarker.value = false
    store.showAlert('success', 'Успешно', 'Для работы с созданным элементом обновите страницу', 10000)
  } else if (response == "Отменить") {
    visibleCreateMarker.value = false
  }
}
async function editMarkers(): Promise<void> {
  visibleEditMarkers.value = true
  let response = await new Promise<string>((resolve) => {
    resolvePromise.value = resolve
  })
  if (response == "Сохранить") {
    if (markers.value) {
      const {data, error } = await supabase.from('schedule_cards_markers').upsert(markers.value)
    }
    visibleEditMarkers.value = false
  } else if (response == "Отменить") {
    visibleEditMarkers.value = false
  }
}
async function deleteMarker(index: number): Promise<void> {
  visibleDeleteMarker.value = true
  let response = await new Promise((resolve) => {
    resolvePromiseConfirm.value = resolve
  })
  if (response == "Да") {
    if (markers.value && markers.value[index]) {
      const { data, error } = await supabase.from("schedule_cards_markers").delete().eq('id', markers.value[index].id)
      markers.value.splice(index, 1)
      visibleDeleteMarker.value = false
    }
  } else if (response == "Нет") {
    visibleDeleteMarker.value = false
  }
}
function showUserRole(): string | undefined {
  switch (currentUserData.value?.role) {
    case "user":
      return "Пользователь";
      break;
    case "editor":
      return "Редактор";
      break;
    case "admin":
      return "Администратор";
      break;
    }
}
async function editProfile(): Promise<void> {
  visibleEditProfile.value = true
  await nextTick()
  let response = await new Promise<string>((resolve) => {
    resolvePromise.value = resolve
  })
  if (response == "Сохранить") {
    if (inputElem.value?.files?.[0] && currentUserData.value) {
      let file = inputElem.value.files[0]
      let id = new Date().getTime()
      await supabase.storage.from("eduneura-bucket").upload(`avatars/avatar-${id}.jpg`, file, {cacheControl: '3600'})
      const imgURL = await supabase.storage.from("eduneura-bucket").getPublicUrl(`avatars/avatar-${id}.jpg`)
      currentUserData.value.avatar = imgURL.data.publicUrl
    } else if (!inputElem.value?.files?.[0] && currentUserData.value) {
      currentUserData.value.avatar = currentUserData.value.avatar
    }
    await supabase.from('profiles').update({ first_name: currentUserFirstName.value, last_name: currentUserLastName.value, avatar: currentUserData.value?.avatar }).eq('id', currentUserData.value?.id)
    // await supabase.auth.updateUser({ password: currentUserNewPassword.value, email: currentUserEmail.value })
    visibleEditProfile.value = false
    uploadImage.value = null
  } else if (response == "Отменить") {
    visibleEditProfile.value = false
    uploadImage.value = null
  }
}
function controlUploadFile(event: Event): void {
  let input = event.target as HTMLInputElement
  if (input.files?.[0]) {
    uploadImage.value = input.files?.[0]
  }
}
async function signOut(): Promise<void>{
  await supabase.auth.signOut()
  router.push({ name: "login" })
  store.currentUserData = null
}
onBeforeMount(async () => {
  const { data, error } = await supabase.auth.getUser()
  currentUserEmail.value = data.user?.email!
  const profile = await supabase.from("profiles").select('*').eq('id', data.user?.id).single()
  if (profile.data) {
    currentUserData.value = profile.data
    currentUserFirstName.value = profile.data.first_name
    currentUserLastName.value = profile.data.last_name
  }
  const markers_data = await supabase.from("schedule_cards_markers").select('*')
  markers.value = markers_data.data
})
</script>

<style lang="scss">
@use "./AppNavbar.scss";
</style>