<template>
  <h1>Hang in there {{ dogName }} this feature is coming soon!</h1>
</template>

<script setup lang="ts">
import { supabase } from "@/supabase";
import { onMounted, ref } from "vue";

const dogName = ref("");
const getPet = async () => {
  const pet = await supabase.from("pet_identity").select("*");

  return pet;
};

onMounted(async () => {
  const pet = await getPet();

  if (pet && pet.data) {
    const data = {
      id: pet.data[0].id,
      name: pet.data[0].name,
      targetDuration: pet.data[0].target_duration,
    };

    dogName.value = data.name;
  }
});
</script>
