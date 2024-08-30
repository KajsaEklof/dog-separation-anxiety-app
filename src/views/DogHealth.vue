<template>
  <v-container>
    <h1>Health</h1>
    <v-row>
      <v-col class="d-flex flex-wrap flex-column justify-start mt-4 mb-8" >
        <v-date-input v-model="entryDate" label="Date" variant="outlined" hide-details />
        <v-text-field v-model="weight" label="Weight" variant="outlined"  type="number" suffix="kg" prepend-icon="mdi-weight-kilogram" class="mt-8" hide-details />
        <v-btn color="primary" class="mt-8" @click="addWeightEntry">Add weight entry</v-btn>
      </v-col>
    </v-row>
    <weight-chart />
  </v-container>
</template>


<script setup lang="ts">
import { ref } from "vue"
import WeightChart from "@/components/WeightChart.vue"
import { supabase } from "@/supabase";
import { useDogStore } from "@/stores/DogStore";
import usePetIdentity from "@/composables/DogIdentity";
import { onMounted } from "vue";

const weight = ref(0)
const entryDate = ref(new Date())

const dogStore = useDogStore();
const { getPet } = usePetIdentity();

onMounted(async () => {
  let petId = dogStore.pet.id;
  if (!petId || petId === '') {
    const pet = await getPet();

    if (pet) {
      petId = pet.id;
    }
  }

  getWeightEntries();
})

async function getWeightEntries() {
  // Get weight entries
  const { data, error } = await supabase
    .from('health_weight')
    .select('weight, created_at')
    .eq('pet_id', dogStore.pet.id)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching weight entries:', error.message);
  } else {
    console.log('Weight entries:', data);
  }

  data?.forEach((entry: any) => {
    // add the weight entry to the chart data
  });
}

async function addWeightEntry() {
  // Add weight entry
  console.log(entryDate.value, weight.value);
  let petId = dogStore.pet.id;
  if (!petId || petId === '') {
    const pet = await getPet();

    if (pet) {
      petId = pet.id;
    }
  }

  const inputDate = entryDate.value

  // Step 1: Extract the components needed
const year = inputDate.getUTCFullYear();
const month = String(inputDate.getMonth() + 1).padStart(2, '0');
const day = String(inputDate.getDate()).padStart(2, '0');
const hours = String(inputDate.getHours()).padStart(2, '0');
const minutes = String(inputDate.getMinutes()).padStart(2, '0');
const seconds = String(inputDate.getSeconds()).padStart(2, '0');
const milliseconds = String(inputDate.getMilliseconds()).padStart(3, '0').slice(0, 2); // Take first two digits of milliseconds

// Step 2: Format the date to the desired format
  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}+00`;

  const call = await supabase.from('health_weight').insert({
        pet_id: petId,
        weight: weight.value,
        created_at: entryDate.value.toISOString(),
      });

      console.log('call', call);
} 
</script>