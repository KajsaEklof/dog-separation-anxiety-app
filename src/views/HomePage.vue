<template>
  <v-container>
    <h1 class="text-center">
        Welcome
      </h1>
    <v-card max-width="500" class="mx-auto mt-4">
      <v-card-title v-if="hasPet">
        <v-avatar variant="outlined">
          <v-icon icon="mdi-dog"></v-icon>
         </v-avatar>
        {{ dogName }}
      </v-card-title>
      <v-card-text>
        <v-list>
          <v-list-item v-for="(value, key) in dog" :key="key">
            <v-list-item-title>{{ key.toLocaleUpperCase() }} </v-list-item-title>
            <v-list-item-subtitle>{{ value }}</v-list-item-subtitle>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
    <v-row>
      <v-col class="d-flex flex-column justify-center align-center">
        <h2 v-if="!hasPet">Add your pooch to get started!</h2>
        <v-btn append-icon="mdi-plus" class="mt-4" @click="openDogDetailsDialog">Add dog</v-btn>
        </v-col>
    </v-row>
    <dog-details-dialog :show-dialog="true" />
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useDogStore } from "@/stores/DogStore";
import usePetIdentity from "@/composables/DogIdentity";
import DogDetailsDialog from "@/components/DogDetailsDialog.vue";

const dogName = ref("");
const dogStore = useDogStore();
const { setPet } = dogStore;
const { getPet } = usePetIdentity();
const hasPet = ref(false);
const dog = ref({
  name: "",
  breed: "",
  sex: "",
  weight: 0,
  birthday: "",
});

onMounted(async () => {
  await getDog();
});


async function getDog(): Promise<void> {
  const pet = await getPet();
  console.log('getPet', pet);
  if (pet) {
    const data = {
      id: pet.id,
      name: pet.name,
      targetDuration: pet.target_duration,
      breed: pet.breed,
      sex: pet.gender,
      weight: pet.weight,
      age: pet.dob,
    };

    dog.value = {
      name: data.name,
      breed: data.breed,
      weight: data.weight,
      birthday: data.age,
      sex: data.sex,
    };

    setPet(data);
    dogName.value = data.name;

    hasPet.value = true;
  }

  setTimeout(() => {
    // isLoadingPet.value = false;
  }, 1000);
}

function openDogDetailsDialog(): void {
  dogStore.setShowDogDetailsDialog(true);
}
</script>
