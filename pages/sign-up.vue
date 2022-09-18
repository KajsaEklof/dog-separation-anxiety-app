<template>
  <c-flex align="center" justify="center" min-height="100vh">
    <c-stack spacing="8" mx="auto" width="lg" py="12" px="6">
      <c-stack align="center">
        <c-heading
          >Create an account

          <c-icon name="paw" color="vue" />
        </c-heading>
      </c-stack>

      <c-box rounded="lg" box-shadow="lg" bg="lightGrey" p="8">
        <c-stack as="form" spacing="4">
          <c-form-control>
            <c-form-label for="email" type="username">Email</c-form-label>
            <c-input id="email" placeholder="Email" autocomplete="username" />
          </c-form-control>
          <c-form-control>
            <c-form-label for="password">Password</c-form-label>
            <c-input-group>
              <c-input
                id="password"
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
          <c-button
            variant="solid"
            mt="8"
            :is-loading="isCreatingAccount"
            @click="createAccount"
            >Create Account</c-button
          >
        </c-stack>
      </c-box>
    </c-stack>
  </c-flex>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
  setup() {
    const state = reactive({
      show: false,
      isCreatingAccount: false,
    })

    const togglePasswordVisibility = () => {
      state.show = !state.show
    }

    const createAccount = () => {
      state.isCreatingAccount = true

      setTimeout(() => {
        state.isCreatingAccount = false
      }, 2000)
    }

    return {
      ...toRefs(state),
      togglePasswordVisibility,
      createAccount,
    }
  },
})
</script>
