<template>
  <v-container fluid class="wrapper flex-column">
    <v-card>
      <v-card-title class="text-center">Sign up</v-card-title>
      <v-card-text>
        <form @submit.prevent="handleSignUp">
          <v-text-field
            v-model="email"
            name="email"
            type="email"
            label="Email"
            placeholder="Enter email"
            autocomplete="email"
            variant="outlined"
            density="comfortable"
          />
          <v-text-field
            v-model="password"
            name="password"
            type="password"
            label="Password"
            placeholder="Enter password"
            autocomplete="password"
            variant="outlined"
            density="comfortable"
          />
          <div v-if="hasErrors" class="error-messages">
            <p class="text-error">{{ errorMessage }}</p>
          </div>
          <v-btn block color="primary" type="submit" class="mt-4"
            >Sign Up</v-btn
          >
        </form>
        <div class="text-center mt-4">
          <span>Already have an account? </span>
          <router-link to="/sign-in">Sign in</router-link>
        </div>
      </v-card-text>
    </v-card>
    <div class="d-flex flex-column mt-4">
      <span>
        This is a personal project that may or may not be maintained.
      </span>
      <span class="text-center mt-4">
        <a
          href="https://github.com/KajsaEklof/dog-separation-anxiety-app"
          target="external"
        >
          View on Github <v-icon>mdi-github</v-icon></a
        >
      </span>
    </div>
  </v-container>
</template>

<script lang="ts" setup>
import { supabase } from "@/supabase";
import { computed, ref } from "vue";

const email = ref("");
const password = ref("");
const errorMessage = ref("");

const hasErrors = computed(() => {
  return errorMessage.value !== "";
});

const handleSignUp = async () => {
  try {
    const authResponse = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });

    console.log(authResponse);

    if (authResponse.error) {
      throw authResponse.error;
    }
  } catch (error: any) {
    // console.error(error)
  }
};
</script>
