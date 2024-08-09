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
        <v-btn append-icon="mdi-plus" class="mt-4" color="primary" @click="openDogDetailsDialog">Add dog</v-btn>
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
  if (dogStore.pet.id) {
    dog.value = {
      name: dogStore.pet.name,
      breed: dogStore.pet.breed,
      weight: parseInt(dogStore.pet.weight) || 0,
      birthday: dogStore.pet.age,
      sex: dogStore.pet.sex,
    };

    dogName.value = dogStore.pet.name;
    hasPet.value = true;
    return
  }

  await getDog();
});


async function getDog(): Promise<void> {
  const pet = await getPet();
  if (pet) {
    dog.value = {
      name: pet.name,
      breed: pet.breed,
      weight: pet.weight,
      birthday: pet.age,
      sex: pet.sex,
    };

    dogName.value = pet.name;

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
