

<!-- DogDetailsDialog.vue -->
<template>
  <v-dialog v-model="showDogDetailsDialog" max-width="800">
    <v-card>
      <v-card-title>Add your beloved dog</v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field
            name="dogName"
            type="text"
            label="Name"
            placeholder="Enter name"
            variant="outlined"
            density="comfortable"
            />
          <v-text-field
            name="dogAge"
            type="date"
            label="Date of birth"
            placeholder="Enter date of birth"
            variant="outlined"
            density="comfortable"
            />
            <v-text-field
            name="dogWeight"
            type="text"
            label="Weight"
            suffix="kg"
            placeholder="Enter weight"
            variant="outlined"
            density="comfortable"
            />
            <v-select
            :items="['Male', 'Female']"
            name="sex"
            label="Sex"
            placeholder="Sex"
            variant="outlined"
            density="comfortable"
            />
            <v-text-field
            name="dogBreed"
            type="text"
            label="Breed"
            placeholder="Enter breed"
            variant="outlined"
            density="comfortable"
            />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn variant="text" @click="cancel">Cancel</v-btn>
        <v-btn variant="tonal">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useDogStore } from "@/stores/DogStore";

const store = useDogStore();
const { showDogDetailsDialog } = storeToRefs(store);

function cancel() {
  store.setShowDogDetailsDialog(false);
}
</script>
