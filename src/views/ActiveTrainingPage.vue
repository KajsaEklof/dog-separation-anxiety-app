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
          <ion-title size="large">Training</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-grid class="center-content h-100 ion-padding column">
        <ion-row>
          <ion-col size="12">
            <h1 class="ion-text-center">You've got this!</h1>
          </ion-col>
          <ion-col size="12">
            <ion-list>
              <ion-item v-for="(warmup, i) in randomWarmups" :key="i">
                <ion-checkbox
                  v-model="completedWarmups[i]"
                  class="ion-margin-end"
                  @ionChange="updateWarmupState($event, i)"
                />
                <ion-label> {{ i + 1 }}. Time: {{ warmup.time }} </ion-label>
              </ion-item>
            </ion-list>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="12">
            <h2 class="ion-text-center">
              Target duration:
              {{ trainingSession.targetDuration }}
            </h2>
          </ion-col>
          <ion-col size="12">
            <ion-radio-group :value="sessionResult">
              <ion-radio value="aced-it" labelPlacement="end">Aced it</ion-radio
              ><br />
              <ion-radio value="ok" labelPlacement="end">OK</ion-radio><br />
              <ion-radio value="struggled" labelPlacement="end"
                >Struggled</ion-radio
              ><br />
            </ion-radio-group>
          </ion-col>
          <ion-col size="12">
            <ion-button
              expand="block"
              class="ion-margin-top"
              color="primary"
              @click="handleCompleteSession"
              >Done!</ion-button
            >
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import { DateTime } from "luxon";
import { useIonRouter } from "@ionic/vue";
import { usePetStore } from "@/stores/DogStore";
import useTrainingSession from "@/composables/TrainingSession";
import usePetIdentity from "@/composables/DogIdentity";

import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonCheckbox,
  IonLabel,
  IonGrid,
  IonRow,
  IonCol,
  IonRadioGroup,
  IonRadio,
} from "@ionic/vue";

const ionRouter = useIonRouter();
const petStore = usePetStore();
const { trainingSession } = petStore;
let completedWarmups: boolean[] = [];
const sessionResult = ref("");

const { updateTrainingSession } = useTrainingSession();
const { updatePetTargetTime } = usePetIdentity();

const warmups = computed(() => {
  return trainingSession.warmups;
});

const randomWarmups = computed(() => {
  const items = [];

  for (let i = 0; warmups.value > i; i++) {
    const item = {
      id: i,
      time: generateWarmup(),
    };

    items.push(item);
  }

  return items;
});

onMounted(() => {
  completedWarmups = completedWarmupsValues();
});

function completedWarmupsValues(): boolean[] {
  const items = [];

  for (let i = 0; warmups.value > i; i++) {
    items.push(false);
  }

  return items;
}

function updateWarmupState(event: CustomEvent, i: number): void {
  if (event.detail && event.detail.checked !== undefined) {
    completedWarmups[i] = event.detail.checked;
  } else {
    completedWarmups[i] = !completedWarmups[i];
  }
}

function generateWarmup(): string {
  const random = Math.floor(Math.random() * 45) + 5;
  const warmupSeconds =
    random.toString().length > 1 ? random.toString() : `0${random.toString()}`;

  return `00:00:${warmupSeconds}`;
}

async function handleCompleteSession(): Promise<void> {
  // Update this training session progress in Supabase
  await updateTrainingSession(sessionResult.value, trainingSession.id);

  // Update the pooches target duration depending on session result
  const currentTD = trainingSession.targetDuration;
  let newTD = "";
  const target: DateTime = DateTime.fromSQL(currentTD);
  let targetSeconds = target.toSeconds();

  switch (sessionResult.value) {
    case "aced-it":
      // Add on 10 seconds to the target duration
      targetSeconds = targetSeconds + 10;
      newTD = DateTime.fromSeconds(targetSeconds).toFormat("HH:mm:ss");
      break;
    case "ok":
      // Keep the target duration the same for next time
      newTD = currentTD;
      break;
    case "struggled":
      // Lower the target duration with 10 seconds for the next time
      targetSeconds = targetSeconds - 10;
      newTD = DateTime.fromSeconds(targetSeconds).toFormat("HH:mm:ss");
      break;
    default:
      // Keep the target duration the same for next time
      newTD = currentTD;
      break;
  }

  const petId = petStore.pet.id;
  await updatePetTargetTime(newTD, petId);

  // Show motivational message to hard working guardian
  // Re-route back to the home page
  ionRouter.push("/");
}
</script>
