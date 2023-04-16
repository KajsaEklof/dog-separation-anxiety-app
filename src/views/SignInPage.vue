<template>
  <ion-page>
    <!-- <ion-header>
      <ion-toolbar>
        <ion-title>Dog Log</ion-title>
      </ion-toolbar>
    </ion-header> -->

    <ion-content>
      <div class="center-content h-100 ion-padding">
        <ion-card class="w-100 login-card">
          <ion-card-header>
            <ion-card-title class="ion-text-center">Sign in</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <form @submit.prevent="handleSignIn">
              <ion-input
                v-model="email"
                name="email"
                type="email"
                label="Email"
                label-placement="stacked"
                fill="outline"
                placeholder="Enter email"
                autocomplete="email"
              ></ion-input>
              <ion-input
                v-model="password"
                name="password"
                type="password"
                label="Password"
                label-placement="stacked"
                fill="outline"
                placeholder="Enter password"
                autocomplete="current-password"
                class="ion-margin-top"
              ></ion-input>

              <ion-button
                type="submit"
                expand="block"
                class="ion-margin-top"
                color="primary"
                >Sign in</ion-button
              >
            </form>
            <div class="ion-text-center ion-margin-top center-content">
              <span>Don't have an account? </span>
              <ion-button
                fill="clear"
                size="small"
                router-link="/sign-up"
                class="ion-margin-start"
                color="secondary"
                >Sign Up</ion-button
              >
            </div>
          </ion-card-content>
        </ion-card>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { supabase } from "@/supabase";
import {
  IonContent,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonPage,
  IonInput,
  IonButton,
  toastController,
  loadingController,
} from "@ionic/vue";
import { defineComponent, ref } from "vue";
import { useIonRouter } from "@ionic/vue";

export default defineComponent({
  name: "SignInPage",
  components: {
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonContent,
    IonPage,
    IonInput,
    IonButton,
  },
  setup() {
    const email = ref("");
    const password = ref("");
    const ionRouter = useIonRouter();

    const handleSignIn = async () => {
      const loader = await loadingController.create({});
      const toast = await toastController.create({ duration: 5000 });

      try {
        await loader.present();
        const authResponse = await supabase.auth.signInWithPassword({
          email: email.value,
          password: password.value,
        });

        console.log(authResponse);

        if (authResponse.error) {
          throw authResponse.error;
        }

        ionRouter.push("/");
      } catch (error: any) {
        toast.message = error.error_description || error.message;
        await toast.present();
      } finally {
        await loader.dismiss();
      }
    };

    return { handleSignIn, email, password };
  },
});
</script>
