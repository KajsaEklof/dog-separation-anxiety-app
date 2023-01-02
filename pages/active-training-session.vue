<template>
  <c-flex align="center" justify="center">
    <c-stack
      spacing="8"
      mx="auto"
      width="lg"
      py="12"
      px="6"
    >
      <c-stack align="center">
        <c-heading>Let's do this!</c-heading>
      </c-stack>
      <c-stack align="center">
        <c-heading as="h3">Warmups</c-heading>
        <c-list spacing="3">
          <c-list-item
            v-for="(warmup, i) in randomWarmups"
            :key="i"
          >
            <c-flex align="center" justify="space-between">
              <c-text
                >{{ i + 1 }}. Time:
                {{ warmup.time }}</c-text
              >
              <c-checkbox
                v-model="completedWarmups[i]"
                label="completed"
                variant-color="green"
                pl="4"
                @change="updateWarmupState(i)"
              />
            </c-flex>
          </c-list-item>
        </c-list>
      </c-stack>
      <c-stack align="center">
        <c-heading as="h3">Target Duration</c-heading>
        <c-heading as="h4">{{
          trainingSession.targetDuration
        }}</c-heading>
        <c-radio-group v-model="sessionResult">
          <c-radio value="aced-it">Aced it</c-radio>
          <c-radio value="ok">OK</c-radio>
          <c-radio value="struggled">Struggled</c-radio>
        </c-radio-group>
        <c-button
          variant="solid"
          variant-color="green"
          @click="handleCompleteSession"
          >Done!</c-button
        >
      </c-stack>
    </c-stack>
  </c-flex>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import { DateTime } from 'luxon';
import { useRouter } from '@nuxtjs/composition-api';
import { usePetStore } from '@/stores/PetStore';
import useTrainingSession from '~/composables/TrainingSession';
import usePetIdentity from '~/composables/PetIdentity';

const router = useRouter();
const petStore = usePetStore();
const { trainingSession } = petStore;
let completedWarmups: boolean[] = [];
const sessionResult = ref('');

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

function updateWarmupState(i: number): void {
  completedWarmups[i] = !completedWarmups[i];
}

function generateWarmup(): string {
  const random = Math.floor(Math.random() * 45) + 5;
  const warmupSeconds =
    random.toString().length > 1
      ? random.toString()
      : `0${random.toString()}`;

  return `00:00:${warmupSeconds}`;
}

async function handleCompleteSession(): Promise<void> {
  // Update this training session progress in Supabase
  await updateTrainingSession(
    sessionResult.value,
    trainingSession.id
  );

  // Update the pooches target duration depending on session result
  const currentTD = trainingSession.targetDuration;
  let newTD = '';
  const target: DateTime = DateTime.fromSQL(currentTD);
  let targetSeconds = target.toSeconds();

  switch (sessionResult.value) {
    case 'aced-it':
      // Add on 10 seconds to the target duration
      targetSeconds = targetSeconds + 10;
      newTD =
        DateTime.fromSeconds(targetSeconds).toFormat(
          'HH:mm:ss'
        );
      break;
    case 'ok':
      // Keep the target duration the same for next time
      newTD = currentTD;
      break;
    case 'struggled':
      // Lower the target duration with 10 seconds for the next time
      targetSeconds = targetSeconds - 10;
      newTD =
        DateTime.fromSeconds(targetSeconds).toFormat(
          'HH:mm:ss'
        );
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
  router.push('/');
}
</script>
