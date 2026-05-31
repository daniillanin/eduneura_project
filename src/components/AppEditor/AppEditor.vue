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
         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M272-200v-560h221q65 0 120 40t55 111q0 51-23 78.5T602-491q25 11 55.5 41t30.5 90q0 89-65 124.5T501-200zm121-112h104q48 0 58.5-24.5T566-372t-10.5-35.5T494-432H393zm0-228h93q33 0 48-17t15-38q0-24-17-39t-44-15h-95z"/></svg>
      </button>
      <button @click="editor.chain().focus().toggleItalic().run()" :disabled="!editor.can().chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M231.54-230v-44.62h145.38l139.23-410.76H370.77V-730h332.31v44.62H562.31L423.08-274.62h140.77V-230z"/></svg>
      </button>
      <button @click="editor.chain().focus().toggleStrike().run()" :disabled="!editor.can().chain().focus().toggleStrike().run()" :class="{ 'is-active': editor.isActive('strike') }">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M486-184.62q-65.23 0-115-35t-74.23-96.07l40.31-17.23q19.38 45.69 56.57 75.15 37.2 29.46 92.81 29.46 51.23 0 96-26.92T627.23-340q0-27.23-7.38-45.31-7.39-18.07-21.7-34.69h52q9.62 12.46 15.2 32.73 5.57 20.27 5.57 47.27 0 74.46-55.34 114.92-55.35 40.46-129.58 40.46M100-500v-40h760v40zm382-278.31q53.69 0 92.04 22.89 38.34 22.88 65.34 70.65l-39.53 18.23q-15.16-27.46-44.27-47.77-29.12-20.31-73.12-20.31-61.77 0-96.46 34.27T356.77-620h-43.69q-6.46-61.31 40.65-109.81 47.12-48.5 128.27-48.5"/></svg>
      </button>
      <button @click="editor.chain().focus().unsetAllMarks().run()">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M501.85-561.38 464.23-599l31.54-76.15H386.54l-49.46-49.47h427.54v49.24H550.31zm271.69 431.53L454.62-449.54l-92.31 217.23h-54.08l109-254.61-295.08-294.31 28.31-28.31 651.39 651.39z"/></svg>
      </button>
      <button @click="editor.chain().focus().toggleHeading({ level: 1 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M154-251v-457h126v165h114v-165h126v457H394v-166H280v166zm526 0v-331h-80v-126h206v457z"/></svg>
      </button>
      <button @click="editor.chain().focus().toggleHeading({ level: 2 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M100.78-263.61v-432.78h106V-533H334v-163.39h106v432.78H334V-427H206.78v163.39zm419.22 0V-427q0-44.3 30.85-75.15T626-533h127.22v-57.39H520v-106h233.22q44.3 0 75.15 30.85 30.85 30.84 30.85 75.15V-533q0 44.3-30.85 75.15T753.22-427H626v57.39h233.22v106z"/></svg>
      </button>
      <button @click="editor.chain().focus().toggleHeading({ level: 3 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M111.87-273.07v-413.86h91v161.43H349v-161.43h91v413.86h-91V-434.5H202.87v161.43zm408.13 0v-91h237.13v-70.43H600v-91h157.13v-70.43H520v-91h237.13q37.78 0 64.39 26.6 26.61 26.61 26.61 64.4v231.86q0 37.79-26.61 64.4-26.61 26.6-64.39 26.6z"/></svg>
      </button>
      <button @click="editor.chain().focus().toggleHeading({ level: 4 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M120-280v-400h80v160h160v-160h80v400h-80v-160H200v160zm600 0v-120H520v-280h80v200h120v-200h80v200h80v80h-80v120z"/></svg>
      </button>
      <button @click="editor.chain().focus().toggleHeading({ level: 5 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M140-290v-380h60v160h180v-160h60v380h-60v-160H200v160zm380 0v-60h227.69q5.39 0 8.85-3.46t3.46-8.85v-75.38q0-5.39-3.46-8.85t-8.85-3.46H520v-220h300v60H580v100h167.69q29.83 0 51.07 21.24T820-437.69v75.38q0 29.83-21.24 51.07T747.69-290z"/></svg>
      </button>
      <button @click="editor.chain().focus().toggleHeading({ level: 6 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M160-300v-360h40v160h200v-160h40v360h-40v-160H200v160zm424.62 0q-26.66 0-45.64-18.98T520-364.62v-230.76q0-26.66 18.98-45.64T584.62-660H800v40H584.62q-10.77 0-17.7 6.92-6.92 6.93-6.92 17.7V-500h175.38q26.66 0 45.64 18.98T800-435.38v70.76q0 26.66-18.98 45.64T735.38-300zM560-460v95.38q0 10.77 6.92 17.7 6.93 6.92 17.7 6.92h150.76q10.77 0 17.7-6.92 6.92-6.93 6.92-17.7v-70.76q0-10.77-6.92-17.7-6.93-6.92-17.7-6.92z"/></svg>
      </button>
      <button @click="editor.chain().focus().setParagraph().run()" :class="{ 'is-active': editor.isActive('paragraph') }">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M413.85-203.08V-440h-7.7q-66.84 0-113.42-46.58-46.58-46.57-46.58-113.42t46.58-113.42Q339.31-760 406.15-760h256.93v40h-80v516.92h-40V-720h-89.23v516.92z"/></svg>
      </button>

      <button @click="toggleColor">
        <svg xmlns="http://www.w3.org/2000/svg" class="color" :fill="editor.getAttributes('textStyle').color" viewBox="0 -960 960 960"><path d="M120 0v-138.46h720V0zm129.23-280 211.54-520h38.46l211.54 520h-48.31l-57.69-145.54H352.62L294.46-280zm117.54-184h223.38L482-736h-5.54z"/></svg>
      </button>
      <Popover ref="popoverColor">
        <ColorPicker v-model="textColor" inline />
        <Button @click="editor.chain().focus().unsetColor().run()" label="Очистить" size="small" severity="secondary"></Button>
      </Popover>

      <button @click="toggleBackgroundColor">
        <svg xmlns="http://www.w3.org/2000/svg" class="color" :fill="editor.getAttributes('textStyle').backgroundColor" viewBox="0 -960 960 960"><path d="M80 0v-80h800V0zm480.15-468.46-104-104-155.38 155.38q-6.92 6.93-6.92 16.93t6.92 16.92l69.92 70.15q6.93 6.93 16.93 6.93t16.92-6.93zm-75.46-132.31L588.46-497 770-678.31q6.92-6.92 6.92-17.69T770-713.69l-68.62-68.62q-6.92-6.92-17.69-6.92T666-782.31zm-42.46-14.38 160.62 160.61-169.77 170q-19.39 19.39-45.35 19.39t-45.35-19.39l-7.69-7.69-46.23 45.31H177.69l101.39-101.16-6.16-6.15q-19.38-19.39-19.61-45.58t19.15-45.57zm0 0 196.23-196.23q19.39-19.39 45.35-19.39t45.34 19.39l70.16 69.92q19.38 19.38 19.38 45.34 0 25.97-19.38 45.35L602.85-454.54z"/></svg>
      </button>
      <Popover ref="popoverBackgroundColor">
        <ColorPicker v-model="textBackgroundColor" inline />
        <Button @click="editor.chain().focus().unsetBackgroundColor().run()" label="Очистить" size="small" severity="secondary"></Button>
      </Popover>

      <button @click="editor.chain().focus().setHardBreak().run()">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M582.62-162.77 467.69-280l114.93-116.46 28.3 28.77L544.77-300h132.15q35.16 0 59.12-25.12Q760-350.23 760-385.38q0-35.16-23.96-59.89T676.92-470H200v-40h476.92q51.46 0 87.27 36.58Q800-436.85 800-385.38q0 51.46-35.81 88.42T676.92-260H544.77l66.15 68.46zM200-260v-40h152.31v40zm0-420v-40h562.31v40z"/></svg>
      </button>
      <button @click="editor.chain().focus().setTextAlign('left').run()" :class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M160-160v-40h640v40zm0-150v-40h400v40zm0-150v-40h640v40zm0-150v-40h400v40zm0-150v-40h640v40z"/></svg>
      </button>
      <button @click="editor.chain().focus().setTextAlign('center').run()" :class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M160-160v-40h640v40zm160-150v-40h320v40zM160-460v-40h640v40zm160-150v-40h320v40zM160-760v-40h640v40z"/></svg>
      </button>
      <button @click="editor.chain().focus().setTextAlign('right').run()" :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M160-760v-40h640v40zm240 150v-40h400v40zM160-460v-40h640v40zm240 150v-40h400v40zM160-160v-40h640v40z"/></svg>
      </button>
      <button @click="editor.chain().focus().toggleBulletList().run()" :class="{ 'is-active': editor.isActive('bulletList') }">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M384.62-220v-40H800v40zm0-240v-40H800v40zm0-240v-40H800v40zM213.08-186.92q-21.9 0-37.49-15.59Q160-218.11 160-240t15.59-37.49q15.59-15.59 37.49-15.59 21.89 0 37.48 15.59 15.59 15.6 15.59 37.49t-15.59 37.49q-15.59 15.59-37.48 15.59m0-240q-21.9 0-37.49-15.43Q160-457.77 160-480t15.59-37.65q15.59-15.43 37.49-15.43 21.89 0 37.48 15.43 15.59 15.42 15.59 37.65t-15.59 37.65q-15.59 15.43-37.48 15.43m-37.66-255.43Q160-697.77 160-720t15.42-37.65q15.43-15.43 37.66-15.43t37.65 15.43q15.42 15.42 15.42 37.65t-15.42 37.65q-15.42 15.43-37.65 15.43t-37.66-15.43"/></svg>
      </button>
      <button @click="editor.chain().focus().toggleOrderedList().run()" :class="{ 'is-active': editor.isActive('orderedList') }">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M160-120v-35.38h100V-210h-60v-35.38h60V-300H160v-35.38h107.69q11.77 0 19.73 7.96t7.96 19.73v55.38q0 11.77-7.96 19.73t-19.73 7.96q11.77 0 19.73 7.97 7.96 7.96 7.96 19.73v49.23q0 11.77-7.96 19.73T267.69-120zm0-252.31V-470q0-11.77 7.96-19.73t19.73-7.96H260v-54.62H160v-35.38h107.69q11.77 0 19.73 7.96t7.96 19.73v70q0 11.77-7.96 19.73t-19.73 7.96h-72.31v54.62h100v35.38zm60-252.31v-180h-60V-840h95.38v215.38zM384.62-220v-40H800v40zm0-240v-40H800v40zm0-240v-40H800v40z"/></svg>
      </button>
      <button @click="setImage">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M224.62-160q-27.62 0-46.12-18.5T160-224.62v-510.76q0-27.62 18.5-46.12t46.12-18.5h280v40h-280q-10.77 0-17.7 6.92-6.92 6.93-6.92 17.7v510.76q0 10.77 6.92 17.7 6.93 6.92 17.7 6.92h510.76q10.77 0 17.7-6.92 6.92-6.93 6.92-17.7v-280h40v280q0 27.62-18.5 46.12T735.38-160zm46.15-144.62h418.46L560-476.92 440-325.38l-80-96.16zM680-600v-80h-80v-40h80v-80h40v80h80v40h-80v80z"/></svg>
      </button>
      <button @click="editor.chain().focus().setHorizontalRule().run()">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M200-460v-40h560v40z"/></svg>
      </button>

      <button @click="toggleTable">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M224.62-160q-27.62 0-46.12-18.5T160-224.62v-510.76q0-27.62 18.5-46.12t46.12-18.5h510.76q27.62 0 46.12 18.5t18.5 46.12v510.76q0 27.62-18.5 46.12T735.38-160zM460-383.85H200v159.23q0 10.77 6.92 17.7 6.93 6.92 17.7 6.92H460zm40 0V-200h235.38q10.77 0 17.7-6.92 6.92-6.93 6.92-17.7v-159.23zm-40-40v-185.38H200v185.38zm40 0h260v-185.38H500zM200-649.23h560v-86.15q0-10.77-6.92-17.7-6.93-6.92-17.7-6.92H224.62q-10.77 0-17.7 6.92-6.92 6.93-6.92 17.7z"/></svg>
      </button>
      <Popover ref="popoverTable">
        <div class="wrapper">
          <button @click="editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M224.62-160q-27.62 0-46.12-18.5T160-224.62v-510.76q0-27.62 18.5-46.12t46.12-18.5h510.76q27.62 0 46.12 18.5t18.5 46.12v510.76q0 27.62-18.5 46.12T735.38-160zM460-383.85H200v159.23q0 10.77 6.92 17.7 6.93 6.92 17.7 6.92H460zm40 0V-200h235.38q10.77 0 17.7-6.92 6.92-6.93 6.92-17.7v-159.23zm-40-40v-185.38H200v185.38zm40 0h260v-185.38H500zM200-649.23h560v-86.15q0-10.77-6.92-17.7-6.93-6.92-17.7-6.92H224.62q-10.77 0-17.7 6.92-6.92 6.93-6.92 17.7z"/></svg>
          </button>
          <button @click="editor.chain().focus().mergeOrSplit().run()">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M140-140v-200h40v160h160v40zm480 0v-40h160v-160h40v200zM287-355.46 258.46-383l77-77H100v-40h235.46l-77-77L287-604.54 411.54-480zm386 0L548.46-480 673-604.54 701.54-577l-77 77H860v40H624.54l77 77zM140-620v-200h200v40H180v160zm640 0v-160H620v-40h200v200z"/></svg>
          </button>
          <button @click="editor.chain().focus().deleteTable().run()">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M304.62-160q-26.85 0-45.74-18.88Q240-197.77 240-224.62V-720h-40v-40h160v-30.77h240V-760h160v40h-40v495.38q0 27.62-18.5 46.12T655.38-160zM680-720H280v495.38q0 10.77 6.92 17.7 6.93 6.92 17.7 6.92h350.76q9.24 0 16.93-7.69t7.69-16.93zM392.31-280h40v-360h-40zm135.38 0h40v-360h-40zM280-720v520z"/></svg>
          </button>
        </div>
        <div class="wrapper">
          <button @click="editor.chain().focus().addColumnBefore().run()">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M800-200v-560H537.69v560zm-600 40v-124.62h40V-200h257.69v-560H240v84.62h-40V-800h640v640zm337.69-320h-40zM200-380v-80h-80v-40h80v-80h40v80h80v40h-80v80z"/></svg>
          </button>
          <button @click="editor.chain().focus().addColumnAfter().run()">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M160-760v560h262.31v-560zm-40 600v-640h640v124.62h-40V-760H462.31v560H720v-84.62h40V-160zm302.31-320h40zM720-380v-80h-80v-40h80v-80h40v80h80v40h-80v80z"/></svg>
          </button>
          <button @click="editor.chain().focus().deleteColumn().run()">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M304.62-160q-26.85 0-45.74-18.88Q240-197.77 240-224.62V-720h-40v-40h160v-30.77h240V-760h160v40h-40v495.38q0 27.62-18.5 46.12T655.38-160zM680-720H280v495.38q0 10.77 6.92 17.7 6.93 6.92 17.7 6.92h350.76q9.24 0 16.93-7.69t7.69-16.93zM392.31-280h40v-360h-40zm135.38 0h40v-360h-40zM280-720v520z"/></svg>
          </button>
        </div>
        <div class="wrapper">
          <button @click="editor.chain().focus().addRowBefore().run()">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M200-160h560v-262.31H200zm600 40H160v-640h124.62v40H200v257.69h560V-720h-84.62v-40H800zM480-422.31v-40zM460-640v-80h-80v-40h80v-80h40v80h80v40h-80v80z"/></svg>
          </button>
          <button @click="editor.chain().focus().addRowAfter().run()">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M200-537.69h560V-800H200zM160-200v-640h640v640H675.38v-40H760v-257.69H200V-240h84.62v40zm320-337.69v40zM460-120v-80h-80v-40h80v-80h40v80h80v40h-80v80z"/></svg>
          </button>
          <button @click="editor.chain().focus().deleteRow().run()">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M304.62-160q-26.85 0-45.74-18.88Q240-197.77 240-224.62V-720h-40v-40h160v-30.77h240V-760h160v40h-40v495.38q0 27.62-18.5 46.12T655.38-160zM680-720H280v495.38q0 10.77 6.92 17.7 6.93 6.92 17.7 6.92h350.76q9.24 0 16.93-7.69t7.69-16.93zM392.31-280h40v-360h-40zm135.38 0h40v-360h-40zM280-720v520z"/></svg>
          </button>
        </div>
      </Popover>
      
      <!-- <button @click="editor.chain().focus().toggleBlockquote().run()" :class="{ 'is-active': editor.isActive('blockquote') }">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="m263.38-267.69 95.85-166.93q-6.92 3.85-16.15 5.39t-18.46 1.54q-56 0-94.16-38.87-38.15-38.86-38.15-93.44 0-56 38.15-94.15 38.16-38.16 94.16-38.16 54.57 0 93.44 38.16 38.86 38.15 38.86 93.88 0 19.42-4.73 36.23t-13.42 31.73L309.23-267.69zm350.77 0L710-434.62q-6.92 3.85-16.15 5.39t-18.47 1.54q-56 0-94.15-38.87-38.15-38.86-38.15-93.44 0-56.77 38.15-94.54t94.15-37.77q54.58 0 93.45 38.16 38.86 38.15 38.86 93.88 0 19.42-4.73 36.23t-13.42 31.73L660-267.69zM386.73-497.88q25.58-25.58 25.58-62.12t-25.58-62.12q-25.58-25.57-62.11-25.57-36.54 0-62.12 25.57-25.58 25.58-25.58 62.12t25.58 62.12q25.58 25.57 62.12 25.57 36.53 0 62.11-25.57m350.77 0q25.58-25.58 25.58-62.12t-25.58-62.12q-25.58-25.57-62.12-25.57-36.53 0-62.11 25.57-25.58 25.58-25.58 62.12t25.58 62.12q25.58 25.57 62.11 25.57 36.54 0 62.12-25.57M324.62-560"/></svg>
      </button>
      <button @click="editor.chain().focus().toggleCode().run()" :disabled="!editor.can().chain().focus().toggleCode().run()" :class="{ 'is-active': editor.isActive('code') }">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M320-267.69 107.69-480 320-692.31l28.54 28.54-184 184L348.31-296zm320 0-28.54-28.54 184-184L611.69-664 640-692.31 852.31-480z"/></svg>
      </button>
      <button @click="editor.chain().focus().toggleCodeBlock().run()" :class="{ 'is-active': editor.isActive('codeBlock') }">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="m384-363.69 28.31-28.54L324.54-480l87-87-28.31-28.54L267.69-480zm192 0L692.31-480 576-596.31l-28.31 28.54L635.46-480l-87.77 87.77zM224.62-160q-27.62 0-46.12-18.5T160-224.62v-510.76q0-27.62 18.5-46.12t46.12-18.5h510.76q27.62 0 46.12 18.5t18.5 46.12v510.76q0 27.62-18.5 46.12T735.38-160zm0-40h510.76q9.24 0 16.93-7.69t7.69-16.93v-510.76q0-9.24-7.69-16.93T735.38-760H224.62q-9.24 0-16.93 7.69T200-735.38v510.76q0 9.24 7.69 16.93t16.93 7.69M200-760v560z"/></svg>
      </button>
      <button @click="editor.chain().focus().clearNodes().run()">Clear nodes</button> -->
      <button @click="editor.chain().focus().undo().run()" :disabled="!editor.can().chain().focus().undo().run()">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M296.15-240v-40h290.16q62.23 0 106.04-42.69 43.8-42.69 43.8-104.23t-43.8-103.85q-43.81-42.31-106.04-42.31H276.62l118.61 118.62-28.31 28.31L200-593.08 366.92-760l28.31 28.31-118.61 118.61h309.69q78.54 0 134.19 54.16 55.65 54.15 55.65 132 0 77.84-55.65 132.38T586.31-240z"/></svg>
      </button>
      <button @click="editor.chain().focus().redo().run()" :disabled="!editor.can().chain().focus().redo().run()">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M373.69-240q-78.54 0-134.19-54.54t-55.65-132.38q0-77.85 55.65-132 55.65-54.16 134.19-54.16h309.69L564.77-731.69 593.08-760 760-593.08 593.08-426.15l-28.31-28.31 118.61-118.62H373.69q-62.23 0-106.04 42.31-43.8 42.31-43.8 103.85t43.8 104.23Q311.46-280 373.69-280h290.16v40z"/></svg>
      </button>
    </div>
  </div>
  <EditorContent class="editor-content" :editor="editor"/>
</template>

<script setup lang="ts">
import { ref, onUpdated, watch, nextTick } from 'vue'
import { supabase } from '@/database/supabase'
import { Dialog, Button, Popover, ColorPicker } from 'primevue'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import { TableKit } from '@tiptap/extension-table'
import { TextStyleKit } from '@tiptap/extension-text-style'
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
      }),
      TextStyleKit
    ]
})

const visibleSetImage = ref(false)
const visibleDangerSetImage = ref(false)
const textColor = ref("")
const textBackgroundColor = ref("")
const resolvePromise = ref<(value: string) => void>()
const inputElem = ref<HTMLInputElement>()
const popoverColor = ref()
const popoverTable = ref()
const popoverBackgroundColor = ref()

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
function toggleColor(event: Event) {
  popoverColor.value.toggle(event)
}
function toggleBackgroundColor(event: Event) {
  popoverBackgroundColor.value.toggle(event)
}
function toggleTable(event: Event) {
  popoverTable.value.toggle(event)
}
onUpdated(() => {
  emit('emit-content', editor.value?.getHTML())
})
watch(() => props.editContent, (newContent) => {
  if (editor.value && newContent !== editor.value.getHTML()) {
    editor.value.commands.setContent(newContent);
  }
})
watch(textColor, (newTextColor) => {
  editor.value?.chain().focus().setColor('#' + newTextColor).run()
})
watch(textBackgroundColor, (newTextBackgroundColor) => {
  editor.value?.chain().focus().setBackgroundColor('#' + newTextBackgroundColor).run()
})
</script>

<style lang="scss">
@use "./AppEditor.scss"
</style>