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
        <v-card v-for="( note, index) in notes" :key="index" class="item" elevation="2" hover @click="openNoteEditor(note)">
          <v-card-title>{{ note.title }}</v-card-title>
        <v-card-text>
          {{ note.content }}

          updated at: {{ formatDate(note.updated_at) }}
        </v-card-text>
      </v-card>
    </div>
   <note-editor-dialog :title="title"  :content="content" :id="noteId" @update-note="updateNote" @cancel="updateLayout"/>
  </v-container>
</template>

<script lang="ts" setup>
import MiniMasonry from 'minimasonry';
import { Ref, onMounted, ref, nextTick } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import NoteEditorDialog from '@/components/NoteEditorDialog.vue';
import { useUiStore } from "@/stores/UiStore";
import { useDogStore } from "@/stores/DogStore";
import usePetIdentity from "@/composables/DogIdentity";
import useNotes from "@/composables/Notes";

interface Note {
  [x: string]: string;
}

const uiStore = useUiStore();
const dogStore = useDogStore();
const { getPet } = usePetIdentity();
const { getNotes } = useNotes();
const title = ref('');
const content = ref('');
const noteId = ref('');
const notes: Ref<Note[]> = ref([]);
let masonary: any = undefined;

onMounted(async () => {
  masonary = new MiniMasonry({
    container: '.masonary_container',
    baseWidth: 150
  });

  let petId = dogStore.pet.id;
  if (!petId || petId === '') {
    const pet = await getPet();

    if (pet) {
      petId = pet.id;
    }
  }

  // get the notes from Supabase
  // TOOD: handle errors
  const data = await getNotes(petId);
  if (data && data.length > 0) {
    notes.value = data;

    console.log('data', data);
    nextTick(() => {
      updateLayout();
    });
  }

})

function updateLayout() {
  masonary.layout();
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString();
}

function addNote() {
  title.value = '';
  content.value = '';
  noteId.value = uuidv4();
  uiStore.setShowNotesEditorDialog(true);
}

function openNoteEditor(note: Note) {
  title.value = note.title;
  content.value = note.content;
  noteId.value = note.id;

  uiStore.setShowNotesEditorDialog(true);
}

function updateNote(note: Note) {
  const noteIndex = notes.value.findIndex((n) => n.id === note.id);

  // If the note is found, update it directly
  if (noteIndex !== -1) {
    notes.value[noteIndex] = note;
  } else {
    // Otherwise, add it to the list
    notes.value.unshift(note);
  }

  uiStore.setShowNotesEditorDialog(false);
  nextTick(() => {
    updateLayout();
  });
}
</script>