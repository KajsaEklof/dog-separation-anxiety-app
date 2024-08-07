

<!-- DogDetailsDialog.vue -->
<template>
  <v-dialog v-model="showDogDetailsDialog" max-width="800">
    <v-card>
      <v-card-title>Add your beloved dog</v-card-title>
      <v-card-text>
        <v-form v-model="isValid" @submit="submitForm">
          <v-text-field
            v-model="name"
            :rules="[rules.required]"
            name="dogName"
            type="text"
            label="Name"
            placeholder="Enter name"
            variant="outlined"
            density="comfortable"
          />
          <v-text-field
            v-model="age"
            :rules="[rules.required]"
            name="dogAge"
            type="date"
            label="Date of birth"
            placeholder="Enter date of birth"
            variant="outlined"
            density="comfortable"
          />
          <v-text-field
            v-model="weight"
            :rules="[rules.required]"
            name="dogWeight"
            type="text"
            label="Weight"
            suffix="kg"
            placeholder="Enter weight"
            variant="outlined"
            density="comfortable"
          />
          <v-select
            v-model="sex"
            :rules="[rules.required]"
            :items="['Male', 'Female']"
            name="sex"
            label="Sex"
            placeholder="Sex"
            variant="outlined"
            density="comfortable"
          />
          <v-text-field
            v-model="breed"
            :rules="[rules.required]"
            name="dogBreed"
            type="text"
            label="Breed"
            placeholder="Enter breed"
            variant="outlined"
            density="comfortable"
          />
          <div class="d-flex justify-end ma-4">
            <v-btn variant="text" @click="cancel">Cancel</v-btn>
            <v-btn  :loading="isLoading" variant="tonal" type="submit">Save</v-btn>
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useDogStore } from "@/stores/DogStore";
import { ref } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '@/supabase';
import useFormValidation from '@/composables/FormValidation';

const store = useDogStore();
const { showDogDetailsDialog } = storeToRefs(store);
const isLoading = ref(false);
const isValid = ref(false);
const name = ref("");
const age = ref("");
const weight = ref("");
const breed = ref("");
const sex = ref("");
const { rules } = useFormValidation();

function cancel() {
  store.setShowDogDetailsDialog(false);
}

function submitForm() {
  if (!isValid.value) {
    isLoading.value = false;
    return;
  }

  saveDogDetails();
}

// TODO: enable using this for updating dog details
async function saveDogDetails() {
  isLoading.value = true;
  // console.log(name.value, age.value, sex.value, weight.value, breed.value);

  const user = await supabase.auth.getUser();
  const userId = user?.data.user?.id  
  
  if (!userId) {
    console.error('User not found');
    isLoading.value = false;
    return;
  }

 const updates = {
    name: name.value,
    dob: age.value,
    weight: weight.value,
    breed: breed.value,
    gender: sex.value,
    id: uuidv4(),
    targetDuration: '0',
  }

  // * Save the dog details to the store
  store.setPet(
    {
      name: name.value,
      age: age.value,
      weight: weight.value,
      breed: breed.value,
      sex: sex.value,
      id: updates.id,
      targetDuration: '0',
    }
  );
  
  try {
    // * Save dog details to Supabase
    const call = await supabase.from('pets').upsert(
        {
          name: name.value,
          dob: age.value,
          weight: weight.value,
          breed: breed.value,
          gender: sex.value,
          id: updates.id,
          user_ids: [userId],
        }
      );

    if (call.error) {
      throw new Error(call.error.message);
    }
  } catch (error) {
    // console.error('Error saving dog details', error);
    isLoading.value = false;
  } finally {
    isLoading.value = false;
    store.setShowDogDetailsDialog(false);
  }
}
</script>
