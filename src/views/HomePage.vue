<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>{{ targetDuration }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">{{ targetDuration }}</ion-title>
        </ion-toolbar>
      </ion-header>

      <h1>Current target duration for {{ dogName }}: {{ targetDuration }}</h1>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
} from "@ionic/vue";
import { ref, onMounted } from "vue";
import { usePetStore } from "@/stores/DogStore";
import usePetIdentity from "@/composables/DogIdentity";

const targetDuration = ref("");
const dogName = ref("");
const petStore = usePetStore();
const { setPet } = petStore;
const { getPet } = usePetIdentity();

onMounted(async () => {
  await getDog();

  const { pet } = petStore;
  targetDuration.value = pet.targetDuration;
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
