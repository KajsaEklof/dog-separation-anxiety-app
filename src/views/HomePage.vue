<template>
  <v-container>
    <div v-if="hasPet">
      <h1 class="text-center">
        Welcome {{ dogName }}
      </h1>
    </div>
    <v-row v-else>
      <v-col class="d-flex flex-column justify-center align-center">
        <h1>Welcome</h1>
        <v-btn append-icon="mdi-plus">Add dog</v-btn>
      </v-col>
    </v-row>
    <dog-details-dialog :show-dialog="true" />
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useDogStore } from "@/stores/DogStore";
import usePetIdentity from "@/composables/DogIdentity";
// import useAuthUser from "@/composables/AuthUser";
import DogDetailsDialog from "@/components/DogDetailsDialog.vue";
// import { storeToRefs } from "pinia";

const dogName = ref("");
const dogStore = useDogStore();
const { setPet } = dogStore;
const { getPet } = usePetIdentity();
// const { getUserAccount } = useAuthUser();
const hasPet = ref(false);

onMounted(async () => {
  await getDog();
});


async function getDog(): Promise<void> {
  const pet = await getPet();
  if (pet && pet.data) {
    const data = {
      id: pet.data[0].id,
      name: pet.data[0].name,
      targetDuration: pet.data[0].target_duration,
    };

    setPet(data);
    dogName.value = data.name;

    hasPet.value = true;
  } 
}
</script>
