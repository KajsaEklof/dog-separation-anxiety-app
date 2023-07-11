<template>
  <v-container>
    <h1 class="text-center">
      Current target duration for {{ dogName }}: {{ targetDuration }}
    </h1>
    <v-row>
      <v-col class="d-flex align-center flex-column mt-4">
        <h2>Times you've trained this week</h2>
        <v-avatar color="primary-container">{{ weeklyTraining }}</v-avatar>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { usePetStore } from "@/stores/DogStore";
import usePetIdentity from "@/composables/DogIdentity";
import useTrainingSession from "@/composables/TrainingSession";

const targetDuration = ref("");
const dogName = ref("");
const petStore = usePetStore();
const { setPet } = petStore;
const { getPet } = usePetIdentity();
const { getWeeklyTrainingSessions } = useTrainingSession();
const weeklyTraining = ref(0);

onMounted(async () => {
  await getDog();

  const { pet } = petStore;
  targetDuration.value = pet.targetDuration;

  const sessions = await getWeeklyTrainingSessions();
  if (sessions) {
    weeklyTraining.value = sessions.length;
  }
});

// function getWeeklyTraining(): void {
//   const today = new Date();
//   const firstDay = new Date(
//     today.setDate(today.getDate() - today.getDay() + 1)
//   );
//   const lastDay = new Date(today.setDate(today.getDate() - today.getDay() + 7));

//   const startDate = `${firstDay.getDay().toString().padStart(2, "0")}-${firstDay
//     .getMonth()
//     .toString()
//     .padStart(2, "0")}-${firstDay.getFullYear()}`;
//   const endDate = `${lastDay.getDay().toString().padStart(2, "0")}-${lastDay
//     .getMonth()
//     .toString()
//     .padStart(2, "0")}-${lastDay.getFullYear()}`;

//   console.log("startDate", startDate);
//   console.log("endDate", endDate);

// }

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
