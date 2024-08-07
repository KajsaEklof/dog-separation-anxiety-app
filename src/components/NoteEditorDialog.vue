<template>
  <v-dialog v-model="store.showNoteEditorDialog" scrollable persistent fullscreen>
    <v-card>
      <v-card-title>{{ isEditing ? 'Edit' : 'Add'}} note</v-card-title>
      <v-card-text>
        <v-text-field label="Title" v-model="editTitle"></v-text-field>
        <v-textarea label="Content" v-model="editContent"></v-textarea>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="addNote">Cancel</v-btn>
        <v-btn @click="saveNote">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { defineProps, ref, watch } from 'vue';
import { useUiStore } from "@/stores/UiStore";

const props = defineProps({
  title: { type: String, required: true },
  content: { type: String, required: true },
  id: { type: String, required: true },
  })

const store = useUiStore();
  
const editTitle = ref(props.title);
const editContent = ref(props.content);
const isEditing = ref(props.id !== '');

watch(() => store.showNoteEditorDialog, (show) => {
  if (show) {
    editTitle.value = props.title;
    editContent.value = props.content;
  }
})

function addNote() {
  console.log('Add note');
}

function saveNote() {
  console.log('Save note');
}
</script>