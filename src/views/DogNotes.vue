<template>
  <v-container>
    <v-row no-gutters>
      <v-col class="py-b pl-2">
        <h1>Notes</h1>
      </v-col>
      <v-col class="d-flex justify-end pb-4 pr-2">
        <v-btn icon="mdi-plus" color="primary" @click="addNote"></v-btn>
      </v-col>
    </v-row>
    <div class="masonry-layout container masonary_container">
      <v-card v-for="( item, index) in items" :key="index" class="item" elevation="2" hover @click="openNoteEditor(item)">
        <v-card-title>{{ item.title }}</v-card-title>
        <v-card-text>{{ item.content }}</v-card-text>
      </v-card>
    </div>
   <note-editor-dialog :title="title"  :content="content" :id="noteId" />
  </v-container>
</template>

<script lang="ts" setup>
import MiniMasonry from 'minimasonry';
import { onMounted, ref } from 'vue';
import NoteEditorDialog from '@/components/NoteEditorDialog.vue';
import { useUiStore } from "@/stores/UiStore";

const uiStore = useUiStore();
const title = ref('');
const content = ref('');
const noteId = ref('');

onMounted(() => {
  const masonry = new MiniMasonry({
    container: '.masonary_container',
    baseWidth: 150
  });
})

function addNote() {
  title.value = '';
  content.value = '';
  noteId.value = '';
  uiStore.setShowNotesEditorDialog(true);
}

function openNoteEditor(item: {
    title: string;
    content: string;
    date: string;
}) {
  title.value = item.title;
  content.value = item.content;
  noteId.value = item.date;

  uiStore.setShowNotesEditorDialog(true);
}


const items = [{
  title: "Note 1",
  content: "This is a note note note, This is a note note note",
  date: "2021-10-10",
},
{
  title: "Note 2",
  content: "This is another note note, , This is a note note note, This is a note note note",
  date: "2021-10-11",
},
{
  title: "Note 3",
  content: "This is yet another note nooooot",
  date: "2021-10-12",
},
{
  title: "Note 4",
  content: "This is yet another note",
  date: "2021-10-13",
},
{
  title: "Note 5",
  content: "This is yet another note",
  date: "2021-10-14",
},
{
  title: "Note 6",
  content: "This is yet another note",
  date: "2021-10-15",
},
{
  title: "Note 7",
  content: "This is yet another note",
  date: "2021-10-16",
},
{
  title: "Note 8",
  content: "This is yet another note",
  date: "2021-10-17",
},
{
  title: "Note 9",
  content: ", This is yet another note, This is yet another note, This is yet another note, This is yet another note, This is yet another note, This is yet another note",
  date: "2021-10-18",
},
{
  title: "Note 10",
  content: "This is yet another note",
  date: "2021-10-19",
},
{
  title: "Note 11",
  content: "This is yet another note",
  date: "2021-10-20",
},
{
  title: "Note 12",
  content: "This is yet another note",
  date: "2021-10-21",
},
{
  title: "Note 13",
  content: "This is yet another note",
  date: "2021-10-22",
},
{
  title: "Note 14",
  content: "This is yet another note",
  date: "2021-10-23",
},
{
  title: "Note 15",
  content: "This is yet another note",
  date: "2021-10-24",
},
{
  title: "Note 16",
  content: "This is yet another note",
  date: "2021-10-25",
}]
</script>