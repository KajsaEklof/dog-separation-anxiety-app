<template>
  <v-container fluid class="wrapper">
    <v-card>
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
  </v-container>
</template>

<script lang="ts">
import { supabase } from "@/supabase";
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import useAuthUser from "@/composables/AuthUser";

export default defineComponent({
  name: "SignInPage",
  components: {},
  setup() {
    const email = ref("");
    const password = ref("");
    const router = useRouter();
    const { rules } = useAuthUser();

    const handleSignIn = async () => {
      // const loader = await loadingController.create({});
      // const toast = await toastController.create({ duration: 5000 });
      console.log("handleSignIn");
      try {
        // await loader.present();
        const authResponse = await supabase.auth.signInWithPassword({
          email: email.value,
          password: password.value,
        });

        console.log(authResponse);

        if (authResponse.error) {
          throw authResponse.error;
        }

        router.push("/");
      } catch (error: any) {
        // toast.message = error.error_description || error.message;
        // await toast.present();
      } finally {
        // await loader.dismiss();
      }
    };

    return { handleSignIn, email, password, rules };
  },
});
</script>
