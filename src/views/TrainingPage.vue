<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Training</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">{{ dogName }} Training</ion-title>
        </ion-toolbar>
      </ion-header>

      <div class="center-content h-100 ion-padding">
        <ion-card class="w-100 login-card">
          <ion-card-header>
            <ion-card-title class="ion-text-center">Let's go!</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <form @submit.prevent="handleStartTraining">
              <ion-input
                v-model="minutes"
                name="minutes"
                type="number"
                label="Minutes"
                label-placement="stacked"
                fill="outline"
                class="ion-margin-top"
              ></ion-input>
              <ion-input
                v-model="seconds"
                name="seconds"
                type="number"
                label="Seconds"
                label-placement="stacked"
                fill="outline"
                class="ion-margin-top"
              ></ion-input>
              <ion-input
                v-model="warmups"
                name="warmups"
                type="number"
                label="Warmups"
                label-placement="stacked"
                fill="outline"
                class="ion-margin-top"
              ></ion-input>
              <ion-button
                type="submit"
                expand="block"
                class="ion-margin-top"
                color="primary"
                >Start training session</ion-button
              >
            </form>
          </ion-card-content>
        </ion-card>
      </div>
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
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonInput,
  IonButton,
} from "@ionic/vue";
import { ref, onMounted } from "vue";
import { useIonRouter } from "@ionic/vue";

import usePetIdentity from "@/composables/DogIdentity";
import useTrainingSession from "@/composables/TrainingSession";
import { usePetStore } from "@/stores/DogStore";

const dogName = ref("");
const targetTime = ref("");
const warmups = ref(5);
const minutes = ref(0);
const seconds = ref(30);
const { getPet } = usePetIdentity();
const { getBaseTrainingSessionDetails, newTrainingSession } =
  useTrainingSession();

const petStore = usePetStore();
const { setTrainingSession } = petStore;
const ionRouter = useIonRouter();

onMounted(async () => {
  console.log("mounted training page", petStore);
  const pet = await getPet();

  if (pet && pet.data) {
    dogName.value = pet.data[0].name;
  }

  const session = await getBaseTrainingSessionDetails();

  targetTime.value = session;
});

async function handleStartTraining(ev: Event): Promise<void> {
  ev.stopPropagation();
  ev.preventDefault();

  const call = await newTrainingSession({
    warmups: warmups.value,
    targetTime: targetTime.value,
  });

  if (call && call.sessionId && !call.error) {
    console.log(call);
    setTrainingSession({
      id: call.sessionId,
      warmups: warmups.value,
      targetDuration: targetTime.value,
    });

    const paramId = call.sessionId.split("-")[0];

    ionRouter.push(`/active-training-session/${paramId}`);
  }
}
</script>
