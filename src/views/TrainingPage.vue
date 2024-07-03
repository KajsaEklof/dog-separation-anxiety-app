<template>
  <div class="training-wrapper flex-column">
    <h1 class="mb-4">{{ dogName }}'s Training</h1>
      <h2 class="text-center">
      Current target duration for {{ dogName }}: {{ targetTime }}
      </h2>
        <h3 class="mt-4 mb-2" >Times you've trained this week</h3>
        <v-avatar color="primary-container" class="mb-8" >{{ weeklyTraining }}</v-avatar>
    <v-card>
      <v-card-title class="text-center">Let's go!</v-card-title>
      <v-card-text>
        <form @submit.prevent="handleStartTraining">
          <v-text-field
            v-model="minutes"
            name="minutes"
            type="number"
            label="Minutes"
            variant="outlined"
            density="comfortable"
            class="mt-4"
          />
          <v-text-field
            v-model="seconds"
            name="seconds"
            type="number"
            label="Seconds"
            variant="outlined"
            density="comfortable"
            class="mt-4"
          />
          <v-text-field
            v-model="warmups"
            name="warmups"
            type="number"
            label="Warmups"
            variant="outlined"
            density="comfortable"
            class="mt-4"
          />
          <v-btn block type="submit" class="mt-4" color="primary">
            Start training session
          </v-btn>
        </form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

import usePetIdentity from "@/composables/DogIdentity";
import useTrainingSession from "@/composables/TrainingSession";
import { usePetStore } from "@/stores/DogStore";
import { useRouter } from "vue-router";
import { supabase } from "@/supabase";

const dogName = ref("");
const targetTime = ref("");
const warmups = ref(5);
const minutes = ref(0);
const seconds = ref(30);
const { getPet } = usePetIdentity();
const {
  getBaseTrainingSessionDetails,
  newTrainingSession,
  getSessionInProgress,
} = useTrainingSession();
const { getWeeklyTrainingSessions } = useTrainingSession();
const weeklyTraining = ref(0);

const petStore = usePetStore();
const { setTrainingSession } = petStore;
const router = useRouter();

onMounted(async () => {
  const pet = await getPet();

  if (pet && pet.data) {
    dogName.value = pet.data[0].name;
  }

  const sessions = await getWeeklyTrainingSessions();
  if (sessions) {
    weeklyTraining.value = sessions.length;
  }

  const inProgressTrainingSession = await getSessionInProgress();

  if (inProgressTrainingSession) {
    console.log("inProgressTrainingSession", inProgressTrainingSession);
    targetTime.value = inProgressTrainingSession.targetTime;

    const times = inProgressTrainingSession.targetTime.split(":");
    seconds.value = parseInt(times[2]);
    minutes.value = parseInt(times[1]);
  } else {
    const session = await getBaseTrainingSessionDetails();
    console.log("session", session);
    targetTime.value = session;
    const times = session.split(":");
    seconds.value = times[2];
    minutes.value = times[1];
  }
});

async function handleStartTraining(ev: Event): Promise<void> {
  ev.stopPropagation();
  ev.preventDefault();

  const mins = minutes.value >= 10 ? minutes.value : `0${minutes.value}`;
  const secs = seconds.value >= 10 ? seconds.value : `0${seconds.value}`;

  const trainingTargetTime = `${mins}:${secs}`;
  const call = await newTrainingSession({
    warmups: warmups.value,
    targetTime: trainingTargetTime,
  });

  console.log("trainingTargetTime", trainingTargetTime);

  if (call && call.sessionId && !call.error) {
    console.log(call);
    setTrainingSession({
      id: call.sessionId,
      warmups: warmups.value,
      targetDuration: trainingTargetTime,
    });

    const paramId = call.sessionId.split("-")[0];

    router.push(`/active-training-session/${paramId}`);
  }
}
</script>

<style lang="scss">
.training-wrapper {
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 2em;

  .content {
    width: 80%;
  }

  .v-card {
    width: 100%;
    max-width: 500px;
  }
}
</style>