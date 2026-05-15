<template>
  <Dialog :visible="visibleSetImage" modal :closable="false" :style="{ width: '25rem' }" header="Изображение">
    <template #default>
      <h4>Загрузите изображение</h4>
      <input ref="inputElem" type="file" accept="image/jpg"></input>
      <p v-if="visibleDangerSetImage" style="color: red; font-size: 0.8rem;">изображение не загружено</p>
    </template>
    <template #footer>
        <Button severity="secondary" label="Отменить" @click="resolvePromise?.('Отменить')"></Button>
        <Button label="Сохранить" @click="resolvePromise?.('Сохранить')"></Button>
    </template>
  </Dialog>
  <div v-if="editor" class="container">
    <div class="wrapper-editor-button">
      <button @click="editor.chain().focus().toggleBold().run()" :disabled="!editor.can().chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }">
        <img src="@/assets/icons/bold.svg" alt="Жирный" width="24" height="24">
      </button>
      <button @click="editor.chain().focus().toggleItalic().run()" :disabled="!editor.can().chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }">
        <img src="@/assets/icons/italic.svg" alt="Курсив" width="24" height="24">
      </button>
      <button @click="editor.chain().focus().toggleStrike().run()" :disabled="!editor.can().chain().focus().toggleStrike().run()" :class="{ 'is-active': editor.isActive('strike') }">
        <img src="@/assets/icons/strike.svg" alt="Зачеркнутый" width="24" height="24">
      </button>
      <button @click="editor.chain().focus().unsetAllMarks().run()">
        <img src="@/assets/icons/clear_format.svg" alt="Очистить формат" width="24" height="24">
      </button>
      <button @click="editor.chain().focus().toggleHeading({ level: 1 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">
        <img src="@/assets/icons/h1.svg" alt="H1" width="24" height="24">
      </button>
      <button @click="editor.chain().focus().toggleHeading({ level: 2 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
        <img src="@/assets/icons/h2.svg" alt="H2" width="24" height="24">
      </button>
      <button @click="editor.chain().focus().toggleHeading({ level: 3 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }">
        <img src="@/assets/icons/h3.svg" alt="H3" width="24" height="24">
      </button>
      <button @click="editor.chain().focus().toggleHeading({ level: 4 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }">
        <img src="@/assets/icons/h4.svg" alt="H4" width="24" height="24">
      </button>
      <button @click="editor.chain().focus().toggleHeading({ level: 5 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }">
        <img src="@/assets/icons/h5.svg" alt="H5" width="24" height="24">
      </button>
      <button @click="editor.chain().focus().toggleHeading({ level: 6 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }">
        <img src="@/assets/icons/h6.svg" alt="H6" width="24" height="24">
      </button>
      <button @click="editor.chain().focus().setParagraph().run()" :class="{ 'is-active': editor.isActive('paragraph') }">
        <img src="@/assets/icons/p.svg" alt="Параграф" width="24" height="24">
      </button>
      <button @click="editor.chain().focus().setHardBreak().run()">
        <img src="@/assets/icons/wrap_line.svg" alt="Перенос строки" width="24" height="24">
      </button>
      <button @click="editor.chain().focus().setTextAlign('left').run()" :class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }">
        <img src="@/assets/icons/align_left.svg" alt="Выравнивание слева" width="24" height="24">
      </button>
      <button @click="editor.chain().focus().setTextAlign('center').run()" :class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }">
        <img src="@/assets/icons/align_center.svg" alt="Выравнивание центр" width="24" height="24">
      </button>
      <button @click="editor.chain().focus().setTextAlign('right').run()" :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }">
        <img src="@/assets/icons/align_right.svg" alt="Выравнивание справа" width="24" height="24">
      </button>
      <button @click="editor.chain().focus().toggleBulletList().run()" :class="{ 'is-active': editor.isActive('bulletList') }">
        <img src="@/assets/icons/list_bullet.svg" alt="Маркированный список" width="24" height="24">
      </button>
      <button @click="editor.chain().focus().toggleOrderedList().run()" :class="{ 'is-active': editor.isActive('orderedList') }">
        <img src="@/assets/icons/list_numeric.svg" alt="Нумерованный список" width="24" height="24">
      </button>
      <button @click="setImage">
        <img src="@/assets/icons/img.svg" alt="Изображение" width="24" height="24">
      </button>
      <button @click="editor.chain().focus().setHorizontalRule().run()">
        <img src="@/assets/icons/separate_line.svg" alt="Разделитель" width="24" height="24">
      </button>
      <div class="wrapper">
        <button @click="editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()">
          <img src="@/assets/icons/table_add.svg" alt="Таблица" width="24" height="24">
        </button>
        <button @click="editor.chain().focus().mergeOrSplit().run()">
          <img src="@/assets/icons/cells_merge_or_split.svg" alt="Объединение или разъединение ячеек" width="24" height="24">
        </button>
        <button @click="editor.chain().focus().deleteTable().run()">
          <img src="@/assets/icons/delete.svg" alt="Удалить таблицу" width="24" height="24">
        </button>
      </div>
      <div class="wrapper">
        <button @click="editor.chain().focus().addColumnBefore().run()">
          <img src="@/assets/icons/column_add_left.svg" alt="Добавить колонку слева" width="24" height="24">
        </button>
        <button @click="editor.chain().focus().addColumnAfter().run()">
          <img src="@/assets/icons/column_add_right.svg" alt="Добавить колонку справа" width="24" height="24">
        </button>
        <button @click="editor.chain().focus().deleteColumn().run()">
          <img src="@/assets/icons/delete.svg" alt="Удалить колонку" width="24" height="24">
        </button>
      </div>
      <div class="wrapper">
        <button @click="editor.chain().focus().addRowBefore().run()">
          <img src="@/assets/icons/row_add_up.svg" alt="Добавить строку сверху" width="24" height="24">
        </button>
        <button @click="editor.chain().focus().addRowAfter().run()">
          <img src="@/assets/icons/row_add_down.svg" alt="Добавить строку снизу" width="24" height="24">
        </button>
        <button @click="editor.chain().focus().deleteRow().run()">
          <img src="@/assets/icons/delete.svg" alt="Удалить строку" width="24" height="24">
        </button>
      </div>
      <!-- <button @click="editor.chain().focus().toggleBlockquote().run()" :class="{ 'is-active': editor.isActive('blockquote') }">
        <img src="@/assets/icons/quote.svg" alt="Цитата" width="24" height="24">
      </button>
      <button @click="editor.chain().focus().toggleCode().run()" :disabled="!editor.can().chain().focus().toggleCode().run()" :class="{ 'is-active': editor.isActive('code') }">
        <img src="@/assets/icons/code.svg" alt="Код" width="24" height="24">
      </button>
      <button @click="editor.chain().focus().toggleCodeBlock().run()" :class="{ 'is-active': editor.isActive('codeBlock') }">
        <img src="@/assets/icons/code_block.svg" alt="Блок кода" width="24" height="24">
      </button>
      <button @click="editor.chain().focus().clearNodes().run()">Clear nodes</button> -->
      <button @click="editor.chain().focus().undo().run()" :disabled="!editor.can().chain().focus().undo().run()">
        <img src="@/assets/icons/undo.svg" alt="Назад" width="24" height="24">
      </button>
      <button @click="editor.chain().focus().redo().run()" :disabled="!editor.can().chain().focus().redo().run()">
        <img src="@/assets/icons/redo.svg" alt="Вперед" width="24" height="24">
      </button>
    </div>
  </div>
  <EditorContent class="editor-content" :editor="editor"/>
</template>

<script setup lang="ts">
import { ref, onUpdated, watch, nextTick } from 'vue'
import { supabase } from '@/database/supabase'
import { Dialog, Button } from 'primevue'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import { TableKit } from '@tiptap/extension-table'
import TextAlign from '@tiptap/extension-text-align'
import Image from 'tiptap-extension-resize-image'

const emit = defineEmits(['emit-content'])
const props = defineProps(['editContent'])

const editor = useEditor({
    content: props.editContent,
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      TableKit.configure({
        table: { resizable: true },
      }),
      Image.configure({
        inline: true,
        resize: {
          enabled: true,
          alwaysPreserveAspectRatio: true,
        }
      })
    ]
})

const visibleSetImage = ref(false)
const visibleDangerSetImage = ref(false)
const resolvePromise = ref<(value: string) => void>()
const inputElem = ref<HTMLInputElement>()

async function setImage(): Promise<void>{
  visibleSetImage.value = true
  await nextTick()
  let response = await new Promise<string>((resolve) => {
    resolvePromise.value = resolve
  })
  if (response == "Сохранить" && !inputElem?.value?.files?.[0]) {
    visibleDangerSetImage.value = true
    setImage()
  } else if (response == "Сохранить" && inputElem?.value?.files?.[0]) {
    let id = new Date().getTime()
    let file = inputElem.value.files[0]
    let { data, error } = await supabase.storage.from("eduneura-bucket").upload(`instructions/image-${id}.jpg`, file, {cacheControl: '3600'})
      if (!error) {
        let { data } = supabase.storage.from("eduneura-bucket").getPublicUrl(`instructions/image-${id}.jpg`)
        editor.value?.chain().focus().setImage({ src: data.publicUrl }).run()
      } else {
        console.log(error);
      }
      visibleSetImage.value = false
  } else if (response == "Отменить") {
    visibleDangerSetImage.value = false
    visibleSetImage.value = false
  }
}
onUpdated(() => {
  emit('emit-content', editor.value?.getHTML())
})
watch(() => props.editContent, (newContent) => {
  if (editor.value && newContent !== editor.value.getHTML()) {
    editor.value.commands.setContent(newContent);
  }
})
</script>

<style lang="scss">
@use "./AppEditor.scss"
</style>