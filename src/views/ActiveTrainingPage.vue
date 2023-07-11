<template>
  <v-container class="wrapper flex-column">
    <h1 class="ion-text-center">You've got this!</h1>
    <div class="content">
      <v-list density="compact" class="my-4">
        <v-list-item
          v-for="(warmup, i) in randomWarmups"
          :key="i"
          density="compact"
        >
          <template v-slot:prepend>
            <span class="pr-2"> {{ i + 1 }}.</span>
            <v-checkbox-btn
              color="primary"
              class="pr-2"
              hide-details
            ></v-checkbox-btn>
          </template>
          <v-list-item-title class="d-flex justify-start align-center">
            Time: {{ warmup.time }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
      <h2 class="text-center">
        Target duration:
        {{ trainingSession.targetDuration }}
      </h2>
      <div class="my-4">
        <v-radio-group :value="sessionResult" label="How did it go?" column>
          <v-radio value="aced-it" color="secondary" label="Aced it" />
          <v-radio value="ok" color="secondary" label="OK" />
          <v-radio value="struggled" color="secondary" label="Struggled" />
        </v-radio-group>
      </div>
      <v-btn block color="primary" @click="handleCompleteSession">Done!</v-btn>
    </div>
  </v-container>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import { DateTime } from "luxon";
import { usePetStore } from "@/stores/DogStore";
import useTrainingSession from "@/composables/TrainingSession";
import usePetIdentity from "@/composables/DogIdentity";
import { useRouter } from "vue-router";

const router = useRouter();
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
  // * Check route to see if we need to fetch the current session
  console.log(router.currentRoute.value);
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
  console.log("currentTD", currentTD);
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
  router.push("/");
}
</script>
