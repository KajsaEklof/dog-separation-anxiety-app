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
        <c-heading>{{ dogName }} Training</c-heading>
      </c-stack>

      <c-box
        rounded="lg"
        box-shadow="lg"
        bg="lightGrey"
        p="8"
      >
        <c-stack
          as="form"
          spacing="4"
          @submit="handleStartTraining"
        >
          <c-form-control>
            <c-form-label for="target" type="time"
              >Target time</c-form-label
            >
            <c-input
              id="target"
              v-model="targetTime"
              type="time"
              step="2"
              min="00:00:00"
              max="04:00:00"
            />
          </c-form-control>
          <c-form-control>
            <c-form-label for="warmups" type="number"
              >Number of Warmups</c-form-label
            >
            <c-number-input
              id="warmups"
              v-model="warmups"
              type="number"
            >
              <c-number-input-field type="number" />
              <c-number-input-stepper>
                <c-number-increment-stepper />
                <c-number-decrement-stepper />
              </c-number-input-stepper>
            </c-number-input>
          </c-form-control>
          <c-button variant="solid" type="submit" mt="8"
            >Let's go!</c-button
          >
        </c-stack>
      </c-box>
    </c-stack>
  </c-flex>
</template>

<script lang="ts" setup>
import {
  ref,
  onMounted,
  useRouter,
} from '@nuxtjs/composition-api';
import usePetIdentity from '~/composables/PetIdentity';
import useTrainingSession from '~/composables/TrainingSession';
import { usePetStore } from '@/stores/PetStore';

const dogName = ref('');
const targetTime = ref('');
const warmups = ref(6);
const { getPet } = usePetIdentity();
const {
  getBaseTrainingSessionDetails,
  newTrainingSession,
} = useTrainingSession();

const petStore = usePetStore();
const { setTrainingSession } = petStore;
const router = useRouter();

onMounted(async () => {
  const pet = await getPet();

  if (pet && pet.data) {
    dogName.value = pet.data[0].name;
  }

  const session = await getBaseTrainingSessionDetails();

  targetTime.value = session;
});

async function handleStartTraining(
  ev: MouseEvent
): Promise<void> {
  ev.stopPropagation();
  ev.preventDefault();

  const call = await newTrainingSession({
    warmups: warmups.value,
    targetTime: targetTime.value,
  });

  if (call && call.sessionId && !call.error) {
    setTrainingSession({
      id: call.sessionId,
      warmups: warmups.value,
      targetDuration: targetTime.value,
    });

    router.push('/active-training-session');
  }
}
</script>
