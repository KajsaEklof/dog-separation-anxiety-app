<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Stats</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Stats</ion-title>
        </ion-toolbar>
      </ion-header>
      <h1>{{ dogName }}</h1>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/vue";
import { supabase } from "@/supabase";
import { onMounted, ref } from "vue";

const dogName = ref("");
const getPet = async () => {
  const pet = await supabase.from("pet_identity").select("*");

  return pet;
};

onMounted(async () => {
  const pet = await getPet();

  if (pet && pet.data) {
    const data = {
      id: pet.data[0].id,
      name: pet.data[0].name,
      targetDuration: pet.data[0].target_duration,
    };

    dogName.value = data.name;
  }
});
</script>
