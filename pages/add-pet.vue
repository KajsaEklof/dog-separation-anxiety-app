<template>
  <c-flex
    align="center"
    justify="center"
    min-height="100vh"
  >
    <c-stack
      spacing="8"
      mx="auto"
      width="lg"
      py="12"
      px="6"
    >
      <c-stack align="center">
        <c-heading>Add your dog </c-heading>
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
          @submit="handleAddPet"
        >
          <c-form-control>
            <c-form-label for="name" type="text"
              >Name</c-form-label
            >
            <c-input
              id="name"
              v-model="name"
              placeholder="Name"
            />
          </c-form-control>
          <!-- <c-form-control>
            <c-form-label for="dob" type="text"
              >Date of Birth</c-form-label
            >
            <c-input-group>
              <c-input
                id="dob"
                v-model="dob"
                placeholder="Date of Birth"
                type="text"
              />
            </c-input-group>
          </c-form-control> -->
          <c-text>{{ errorMessage }}</c-text>
          <c-button
            variant="solid"
            type="submit"
            mt="8"
            :is-loading="isAddingPet"
            >Add dog</c-button
          >
        </c-stack>
        <c-divider mt="4" border-color="brand.navy" />

        <c-stack align="center">
          <button @click="handleLogout">Sign out</button>
        </c-stack>
      </c-box>
    </c-stack>
  </c-flex>
</template>

<script lang="ts" setup>
import { ref, useRouter } from '@nuxtjs/composition-api';
import useAuthUser from '~/composables/AuthUser';
import usePetIdentity from '~/composables/PetIdentity';

const isAddingPet = ref(false);
const name = ref('');
// const dob = ref('');
const targetTime = ref(0);
const errorMessage = ref('');

const { logout } = useAuthUser();
const { addPet } = usePetIdentity();
const router = useRouter();

async function handleAddPet(ev: MouseEvent): Promise<void> {
  ev.preventDefault();
  ev.stopPropagation();

  const options = {
    name: name.value,
    targetTime: targetTime.value,
  };

  const call = await addPet(options);
  console.log('call', call);
}

async function handleLogout(ev: MouseEvent): Promise<void> {
  ev.preventDefault();
  ev.stopPropagation();

  console.log('logout');

  await logout();

  router.push('/');
}
</script>
