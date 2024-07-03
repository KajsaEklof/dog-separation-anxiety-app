<template>
  <v-container fluid class="wrapper flex-column">
    <v-card class="d-flex flex-column">
      <img src="../../public/logo/puppy-logo.svg" width="100" class="logo" />
      <v-card-title class="text-center">Sign in</v-card-title>
      <v-card-text>
        <form @submit.prevent="handleSignIn">
          <v-text-field
            v-model="email"
            :rules="[rules.required]"
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
            :rules="[rules.required]"
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
            >Sign In</v-btn
          >
        </form>
        <div class="text-center mt-4">
          <span>Don't have an account? </span>
          <router-link to="/sign-up">Sign Up</router-link>
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
import { useRouter } from "vue-router";
import useAuthUser from "@/composables/AuthUser";

const email = ref("");
const password = ref("");
const router = useRouter();
const { rules } = useAuthUser();
const errorMessage = ref("");

const hasErrors = computed(() => {
  return errorMessage.value !== "";
});

const handleSignIn = async () => {
  try {
    const authResponse = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });

    console.log(authResponse);

    if (authResponse.error) {
      errorMessage.value = authResponse.error.message;
      throw authResponse.error;
    }

    router.push("/");
  } catch (error: any) {
    // toast.message = error.error_description || error.message;
    // await toast.present();
  }
};
</script>

<style lang="scss">
.logo {
  margin: 1em auto 0 auto; 
}
</style>