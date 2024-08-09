<template>
  <v-dialog v-model="store.showNoteEditorDialog" scrollable persistent fullscreen>
    <v-card>
      <v-card-title>{{ isEditing ? 'Edit' : 'Add'}} note</v-card-title>
      <v-card-text>
        <v-text-field v-model="editTitle"  placeholder="Title" variant="solo" class="plain-text-input title"></v-text-field>
        <v-textarea v-model="editContent" placeholder="Thing that I must remember..." variant="solo" class="plain-text-input" ></v-textarea>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="cancel">Cancel</v-btn>
        <v-btn @click="saveNote">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { defineProps, ref, watch } from 'vue';
import { useUiStore } from "@/stores/UiStore";
import { useDogStore } from "@/stores/DogStore";
import { supabase } from '@/supabase';

const props = defineProps({
  title: { type: String, required: true },
  content: { type: String, required: true },
  id: { type: String, required: true },
  })

const store = useUiStore();
const dogStore = useDogStore();
  
const editTitle = ref(props.title);
const editContent = ref(props.content);
const isEditing = ref(props.id !== '');

watch(() => store.showNoteEditorDialog, (show) => {
  if (show) {
    editTitle.value = props.title;
    editContent.value = props.content;
  }
})

function cancel() {
  store.setShowNotesEditorDialog(false);
}

async function saveNote() {
  const call = await supabase.from('notes').upsert({
    id: props.id,
    title: editTitle.value,
    content: editContent.value,
    pet_id: dogStore.pet.id,
  });
}
</script>