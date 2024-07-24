<template>
  <v-container>
    <div v-if="hasPet">
      <h1 class="text-center">
        Welcome {{ dogName }}
      </h1>
      <v-btn append-icon="mdi-plus" class="mt-4" @click="openDogDetailsDialog">Edit dog</v-btn>
    </div>
    <v-row v-else>
      <v-col class="d-flex flex-column justify-center align-center">
          <h1>Welcome</h1>
          <h2>Add your pooch to get started!</h2>
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
      weight: '0',
      age: '0',
    };

    setPet(data);
    dogName.value = data.name;

    hasPet.value = true;
  }
}

function openDogDetailsDialog(): void {
  dogStore.setShowDogDetailsDialog(true);
}
</script>
