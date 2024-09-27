<template>
  <v-dialog v-model="store.showMedicineDialog" scrollable persistent fullscreen>
    <v-card class="pa-8">
      <v-card-title class="pl-0 d-flex justify-space-between align-center">
        {{ isEditing ? 'Edit' : 'Add'}} medicine
        <!-- <v-text-field v-model="editTitle"  placeholder="Title" variant="solo" class="plain-text-input title" hide-details></v-text-field> -->
        <v-btn icon variant="flat" @click="removeMedicine">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text class="pl-0 pt-0">
        <v-text-field label="Name" variant="outlined" />
        <v-text-field label="Dosage" variant="outlined" />
        <v-text-field label="Frequency" variant="outlined" />
      </v-card-text>
      <v-card-actions class="pa-4">
        <v-spacer />
        <v-btn variant="outlined" @click="cancel">Cancel</v-btn>
        <v-btn color="primary" variant="elevated" :loading="isSaving" @click="saveMedicine">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, watch } from 'vue';
import { useUiStore } from "@/stores/UiStore";
// import { useDogStore } from "@/stores/DogStore";
import useHealth from '@/composables/DogHealth';

const props = defineProps({
  // title: { type: String, required: true },
  // content: { type: String, required: true },
  id: { type: String, required: true },
})
const emit = defineEmits(['updateMedicine', 'cancel', 'deleteMedicine']);

const store = useUiStore();
// const dogStore = useDogStore();
const { removeMedicineEntry } = useHealth();
const isEditing = ref(false);
const isSaving = ref(false);

function cancel() {
  emit('cancel');
  store.setShowMedicineDialog(false);
}

function fixSeconds(date: Date) {
  date.setSeconds(date.getSeconds() + 1);
  return date;
}

async function saveMedicine() {  
  isSaving.value = true;

  try {
    // await createOrUpdateMedicine({
    //   id: props.id,
    //   title: editTitle.value,
    //   content: editContent.value,
    //   pet_id: dogStore.pet.id,
    // });

    const date = fixSeconds(new Date());
    const updatedAt = date.toISOString().replace('Z', '+00:00');

    emit('updateMedicine', {
      id: props.id,
      updated_at: updatedAt,
    });
  } catch (error) {
    console.error('error', error);

    // TODO display error
  }
}

async function removeMedicine() {
  if (props.id === '') {
    return;
  }

// TODO: confirm dialog

  try {
    await removeMedicineEntry(props.id);

    emit('deleteMedicine', props.id);
  } catch (error) {
    console.error('error', error);

    // TODO: display error 
  }
}

</script>