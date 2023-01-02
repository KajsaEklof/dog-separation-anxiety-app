<template>
  <c-flex align="center" justify="center" min-height="100vh">
    <c-stack spacing="8" mx="auto" width="lg" py="12" px="6">
      <c-stack align="center">
        <c-heading
          >Create an account
          <!-- <c-icon name="paw" color="vue" /> -->
        </c-heading>
      </c-stack>
      <c-box rounded="lg" box-shadow="lg" bg="lightGrey" p="8">
        <c-stack as="form" spacing="4" @submit="handleSignUp">
          <c-form-control>
            <c-form-label for="email" type="username">Email</c-form-label>
            <c-input
              id="email"
              v-model="email"
              placeholder="Email"
              autocomplete="username"
            />
          </c-form-control>
          <c-form-control>
            <c-form-label for="password">Password</c-form-label>
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
            mt="8"
            :is-loading="isCreatingAccount"
            type="submit"
            >Create Account</c-button
          >
        </c-stack>
        <c-divider mt="4" border-color="pa" />
        <c-stack align="center">
          <NuxtLink to="sign-in">Sign in</NuxtLink>
        </c-stack>
      </c-box>
    </c-stack>
  </c-flex>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from '@nuxtjs/composition-api';
import useAuthUser from '~/composables/AuthUser';
const { register } = useAuthUser();

const show = ref(false);
const isCreatingAccount = ref(false);
const email = ref('');
const password = ref('');
const errorMessage = ref('');
const router = useRouter();

function togglePasswordVisibility(): void {
  show.value = !show.value;
}

async function handleSignUp(ev: MouseEvent): Promise<void> {
  console.log('handleSignUp');
  ev.preventDefault();
  ev.stopPropagation();

  isCreatingAccount.value = true;

  const signUpResponse = await register({
    email: email.value,
    password: password.value,
  });

  console.log('signUpResponse', signUpResponse);

  if (!signUpResponse) {
    return;
  }

  if (signUpResponse.error) {
    errorMessage.value = signUpResponse.error.message;
    isCreatingAccount.value = false;
  } else {
    router.push('/');
  }
}
</script>

<script lang="ts">
export default {
  layout: 'auth',
};
</script>
