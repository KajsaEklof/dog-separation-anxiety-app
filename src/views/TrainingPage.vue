<template>
  <v-container class="wrapper flex-column">
    <h1 class="mb-4">{{ dogName }} Training</h1>

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
  </v-container>
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
const { getBaseTrainingSessionDetails, newTrainingSession } =
  useTrainingSession();

const petStore = usePetStore();
const { setTrainingSession } = petStore;
const router = useRouter();

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

    router.push(`/active-training-session/${paramId}`);
  }
}
</script>