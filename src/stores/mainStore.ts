import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { toastTheme } from '@/types/types'
import { useToast } from 'primevue'

export const useMainStore = defineStore('mainStore', () => {

const tableCategory = ref<string[]>(["Общая", "Табель", "График поддержки", "График лекторов"])
const instructionsCategory = ref<string[]>(["Для лекторов", "Для студентов"])
const scheduleCategory = ref<string[]>(["Карточки", "Список"])

const toast = useToast()
function showAlert(theme: toastTheme, title: string, message: string, time: number): void {
    toast.add({ severity: theme, summary: title, detail: message, life: time })
}

return { instructionsCategory, tableCategory, scheduleCategory, showAlert }
})
