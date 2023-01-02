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
        <c-heading
          >Sign in to your account

          <!-- <c-icon name="paw" color="vue" /> -->
        </c-heading>
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
          @submit="handleSignIn"
        >
          <c-form-control>
            <c-form-label for="email" type="username"
              >Email</c-form-label
            >
            <c-input
              id="email"
              v-model="email"
              placeholder="Email"
              autocomplete="username"
            />
          </c-form-control>
          <c-form-control>
            <c-form-label for="password"
              >Password</c-form-label
            >
            <c-input-group>
              <c-input
                id="password"
                v-model="password"
                placeholder="Password"
                :type="show ? '' : 'password'"
                autocomplete="new-password"
              />
              <c-input-right-element width="4.5rem">
                <c-icon-button
                  variant="outline"
                  icon="paw"
                  size="sm"
                  is-round
                  aria-label="Show/Hide password"
                  @click="togglePasswordVisibility"
                >
                  {{ show ? 'Hide' : 'Show' }}
                </c-icon-button>
              </c-input-right-element>
            </c-input-group>
          </c-form-control>
          <c-text>{{ errorMessage }}</c-text>
          <c-button
            variant="solid"
            type="submit"
            mt="8"
            :is-loading="isSigningIn"
            >Sign in</c-button
          >
        </c-stack>
        <c-divider mt="4" border-color="brand.navy" />
        <!-- <c-button variant="solid" mt="8" @click="recoverAccount"
          >Recover account</c-button
        > -->
        <c-stack align="center">
          <NuxtLink to="sign-up">Create account</NuxtLink>
        </c-stack>
      </c-box>
    </c-stack>
  </c-flex>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from '@nuxtjs/composition-api';
import useAuthUser from '~/composables/AuthUser';
import usePetIdentity from '~/composables/PetIdentity';
import { useUserStore } from '@/stores/UserStore';
import { usePetStore } from '@/stores/PetStore';

const show = ref(false);
const isSigningIn = ref(false);
const email = ref('');
const password = ref('');
const errorMessage = ref('');
const router = useRouter();
const { login } = useAuthUser();
const userStore = useUserStore();
const { setUser } = userStore;

const petStore = usePetStore();
const { setPet } = petStore;
const { getPet } = usePetIdentity();

function togglePasswordVisibility(): void {
  show.value = !show.value;
}

// async function recoverAccount(): Promise<void> {
//   const passwordResetResponse = await sendPasswordRestEmail(email.value);

//   console.log('passwordResetResponse', passwordResetResponse);
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
  }
}

async function handleSignIn(ev: MouseEvent): Promise<void> {
  ev.preventDefault();
  ev.stopPropagation();

  isSigningIn.value = true;
  const loginResponse = await login({
    email: email.value,
    password: password.value,
  });

  if (!loginResponse) {
    return;
  }

  if (loginResponse.error) {
    errorMessage.value = loginResponse.error.message;
    isSigningIn.value = false;
  } else if (loginResponse.user) {
    // Set the logged in user details to the UserStore
    setUser(loginResponse.user);

    await getDog();

    router.push('/');
  }
}
</script>

<script lang="ts">
export default {
  layout: 'auth',
};
</script>
