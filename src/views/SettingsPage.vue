<template>
  <div class="text-center">
    <h1>settings</h1>
    <v-btn color="primary" @click="signOut">Log Out</v-btn>
  </div>
</template>

<script lang="ts">
// import { store } from "@/store";
import { supabase } from "@/supabase";
import { User } from "@supabase/supabase-js";
import { defineComponent, onMounted, ref } from "vue";
export default defineComponent({
  name: "SettingsPage",
  setup() {
    const session = ref(supabase.auth.getSession());
    const profile = ref({
      username: "",
      website: "",
      avatar_url: "",
    });
    // const user = store.user as User;
    async function getProfile() {
      // const loader = await loadingController.create({});
      // const toast = await toastController.create({ duration: 5000 });
      // await loader.present();
      // try {
      //   const { data, error, status } = await supabase
      //     .from("profiles")
      //     .select(`username, website, avatar_url`)
      //     .eq("id", user.id)
      //     .single();
      //   if (error && status !== 406) throw error;
      //   if (data) {
      //     console.log(data);
      //     profile.value = {
      //       username: data.username,
      //       website: data.website,
      //       avatar_url: data.avatar_url,
      //     };
      //   }
      // } catch (error: any) {
      //   toast.message = error.message;
      //   await toast.present();
      // } finally {
      //   await loader.dismiss();
      // }
    }

    const updateProfile = async () => {
      // const loader = await loadingController.create({});
      // const toast = await toastController.create({ duration: 5000 });
      // try {
      //   await loader.present();
      //   const updates = {
      //     id: user.id,
      //     ...profile.value,
      //     updated_at: new Date(),
      //   };
      //   //
      //   const { error } = await supabase.from("profiles").upsert(updates, {
      //     returning: "minimal", // Don't return the value after inserting
      //   });
      //   //
      //   if (error) throw error;
      // } catch (error: any) {
      //   toast.message = error.message;
      //   await toast.present();
      // } finally {
      //   await loader.dismiss();
      // }
    };

    async function signOut() {
      try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
      } catch (error: any) {
        console.error(error);
      }
    }

    onMounted(() => {
      getProfile();
    });
    return { signOut, profile, session, updateProfile };
  },
});
</script>
