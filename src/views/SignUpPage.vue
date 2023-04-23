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

<script lang="ts">
import { supabase } from "@/supabase";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "SignUpPage",
  setup() {
    const email = ref("");
    const password = ref("");
    const handleSignUp = async () => {
      // const loader = await loadingController.create({});
      // const toast = await toastController.create({ duration: 5000 });

      try {
        // await loader.present();
        const authResponse = await supabase.auth.signInWithPassword({
          email: email.value,
          password: password.value,
        });

        console.log(authResponse);

        if (authResponse.error) throw authResponse.error;
        // toast.message = "Check your email for the login link!";
        // await toast.present();
      } catch (error: any) {
        // toast.message = error.error_description || error.message;
        // await toast.present();
      } finally {
        // await loader.dismiss();
      }
    };
    return { handleSignUp, email, password };
  },
});
</script>
