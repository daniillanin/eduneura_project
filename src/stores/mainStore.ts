import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useMainStore = defineStore('mainStore', () => {

const tableCategory = ref<string[]>(["Общая", "Табель", "График поддержки", "График лекторов"])
const instructionsCategory = ref<string[]>(["Для лекторов", "Для студентов"])
const scheduleCategory = ref<string[]>(["Карточки", "Список"])

return { instructionsCategory, tableCategory, scheduleCategory }
})
