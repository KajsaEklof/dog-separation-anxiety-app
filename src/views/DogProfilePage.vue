<template>
  <v-container class="wrapper flex-column">
    <v-card>
      <v-card-title class="profile-card-title">
        <span class="name">
          {{ dogName }}
        </span>
        <v-btn density="comfortable" flat icon @click="startEditing">
          <v-icon size="small" color="primary">mdi-pencil</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-list v-if="!isEditing">
          <v-list-item>
            <v-list-item-title>Sex: {{ dog.sex }}</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Breed: {{ dog.breed }}</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Birthday: {{ birthday }}</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Age: {{ age }}</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Weight: {{ dog.weight }}kg</v-list-item-title>
          </v-list-item>
        </v-list>
        <form v-else>
          <v-select
            v-model="editValues.sex"
            :items="dogProfileGenderItems"
            placeholder="Male or female?"
            variant="outlined"
            label="Sex"
            class="mb-2"
          />
          <v-text-field
            v-model="editValues.breed"
            label="Breed"
            placeholder="Enter the breed..."
            variant="outlined"
            type="text"
            class="mb-2"
          ></v-text-field>
          <v-text-field
            v-model="editValues.dob"
            label="Birthday"
            placeholder="Pick your dog's birthday"
            variant="outlined"
            type="date"
            class="mb-2"
          ></v-text-field>
          <v-text-field
            v-model="editValues.weight"
            label="Weight"
            variant="outlined"
            placeholder="Enter dog's weight in kg"
            type="number"
            suffix="kg"
            hint="Enter your dogs weight in kg"
            class="mb-2"
          ></v-text-field>
        </form>
      </v-card-text>
      <v-card-actions v-if="isEditing" class="justify-end pb-4 pr-4">
        <v-btn variant="text" @click="cancelEditing">Cancel</v-btn>
        <v-btn variant="tonal" color="primary" flat @click="saveChanges"
          >Save</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import usePetIdentity from "@/composables/DogIdentity";
import { supabase } from "@/supabase";
import { computed, onMounted, ref } from "vue";

// import DogProfileDetails from '@/components/DogProfileDetails.vue'

const dogName = ref("");
const dogId = ref("");
const { updateDogDetails } = usePetIdentity();
const getPet = async () => {
  const pet = await supabase.from("pet_identity").select("*");

  return pet;
};
const dog = ref({
  breed: null,
  weight: null,
  sex: null,
  dob: null,
  photo: null,
});
const isEditing = ref(false);
const editValues = ref({
  breed: null,
  weight: null,
  sex: null,
  dob: null,
  photo: null,
});
const birthday = computed(() => {
  if (!dog.value.dob) {
    return "Not set";
  }

  return new Date(dog.value.dob).toLocaleString("en", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
});
const age = computed(() => {
  if (!dog.value.dob) {
    return "0 years";
  }

  const ageDiff = Date.now() - Date.parse(dog.value.dob);
  const age = new Date(ageDiff);

  return Math.abs(age.getUTCFullYear() - 1970);
});
const dogProfileGenderItems = ["Male", "Female"];

onMounted(async () => {
  const dogData = await getDogDetails();

  if (dogData) {
    dog.value = {
      breed: dogData["breed"],
      weight: dogData["weight"],
      sex: dogData["sex"],
      dob: dogData["dob"],
      photo: dogData["photo"],
    };

    dogId.value = dogData.id;
    dogName.value = dogData.name;
  }
});

const getDogDetails = async () => {
  const pet = await getPet();

  if (pet && pet.data) {
    const dogData = pet.data[0];

    return dogData;
  }

  return;
};

const startEditing = () => {
  editValues.value = dog.value;
  isEditing.value = true;
};

const saveChanges = async () => {
  // Update the database with the edit values
  try {
    await updateDogDetails(editValues.value, dogId.value);
  } catch (error) {
    // TODO Display errors in the UI
  }

  const dogData = await getDogDetails();
  if (dogData) {
    dog.value = {
      breed: dogData["breed"],
      weight: dogData["weight"],
      sex: dogData["sex"],
      dob: dogData["dob"],
      photo: dogData["photo"],
    };
  }

  isEditing.value = false;
};

const cancelEditing = () => {
  editValues.value = {
    breed: null,
    weight: null,
    sex: null,
    dob: null,
    photo: null,
  };

  isEditing.value = false;
};
</script>
