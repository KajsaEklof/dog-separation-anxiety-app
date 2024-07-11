<template>
  <v-container>
    <h1 class="text-center">
      Welcome {{ dogName }}
    </h1>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { usePetStore } from "@/stores/DogStore";
import usePetIdentity from "@/composables/DogIdentity";
import userUserAccount from "@/composables/UserAccount";

const dogName = ref("");
const petStore = usePetStore();
const { setPet } = petStore;
const { getPet } = usePetIdentity();
const { checkUser } = userUserAccount();

onMounted(async () => {
  await checkUser();
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
  }
}
</script>
