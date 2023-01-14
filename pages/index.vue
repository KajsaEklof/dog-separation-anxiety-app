<template>
  <main class="main-wrapper">
    <c-stack align="center">
      <c-heading
        >Current target duration for
        {{ dogName }}:</c-heading
      >
      <c-heading as="h3">{{ targetDuration }}</c-heading>
    </c-stack>
    <c-stack align="end">
      <c-button
        variant-color="red"
        outline
        @click="handleLogout"
        >Logout</c-button
      >
    </c-stack>
  </main>
</template>

<script lang="ts" setup>
import {
  onMounted,
  ref,
  useRouter,
} from '@nuxtjs/composition-api';
import { usePetStore } from '@/stores/PetStore';
import useAuthUser from '~/composables/AuthUser';
import usePetIdentity from '~/composables/PetIdentity';

const { logout } = useAuthUser();
const router = useRouter();

const targetDuration = ref('');
const dogName = ref('');
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

async function handleLogout(ev: MouseEvent): Promise<void> {
  ev.preventDefault();
  ev.stopPropagation();

  console.log('logout');

  await logout();

  router.push('/sign-in');
}
</script>
