<template>
  <v-dialog v-model="store.showNoteEditorDialog" scrollable persistent fullscreen>
    <v-card class="pa-8">
      <v-card-title class="pl-0 d-flex align-center">
        <!-- {{ isEditing ? 'Edit' : 'Add'}} note -->
        <v-text-field v-model="editTitle"  placeholder="Title" variant="solo" class="plain-text-input title" hide-details></v-text-field>
        <v-btn icon variant="flat" @click="removeNote">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text class="pl-0 pt-0">
        <v-textarea v-model="editContent" placeholder="Thing that I must remember..." variant="solo" class="plain-text-input" auto-grow></v-textarea>
      </v-card-text>
      <v-card-actions class="pa-4">
        <v-spacer />
        <v-btn variant="outlined" @click="cancel">Cancel</v-btn>
        <v-btn color="primary" variant="elevated" :loading="isSaving" @click="saveNote">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, watch } from 'vue';
import { useUiStore } from "@/stores/UiStore";
import { useDogStore } from "@/stores/DogStore";
import useNotes from "@/composables/Notes";

const props = defineProps({
  title: { type: String, required: true },
  content: { type: String, required: true },
  id: { type: String, required: true },
})
const emit = defineEmits(['updateNote', 'cancel', 'deleteNote']);

const store = useUiStore();
const dogStore = useDogStore();
const { createOrUpdateNote, deleteNote } = useNotes();
  
const editTitle = ref(props.title);
const editContent = ref(props.content);
const isSaving = ref(false);
// const isEditing = ref(props.id !== '');

watch(() => store.showNoteEditorDialog, (show) => {
  if (show) {
    editTitle.value = props.title;
    editContent.value = props.content;
  } else {
    isSaving.value = false;
  }
})

function cancel() {
  emit('cancel');
  store.setShowNotesEditorDialog(false);
}

function fixSeconds(date: Date) {
  date.setSeconds(date.getSeconds() + 1);
  return date;
}


async function saveNote() {  
  isSaving.value = true;

  try {
    await createOrUpdateNote({
      id: props.id,
      title: editTitle.value,
      content: editContent.value,
      pet_id: dogStore.pet.id,
    });

    const date = fixSeconds(new Date());
    const updatedAt = date.toISOString().replace('Z', '+00:00');

    emit('updateNote', {
      id: props.id,
      title: editTitle.value,
      content: editContent.value,
      updated_at: updatedAt,
    });
  } catch (error) {
    console.error('error', error);

    // TODO display error
  }
}

async function removeNote() {
  if (props.id === '') {
    return;
  }

// TODO: confirm dialog

  try {
    await deleteNote(props.id);

    emit('deleteNote', props.id);
  } catch (error) {
    console.error('error', error);

    // TODO: display error 
  }
}
</script>