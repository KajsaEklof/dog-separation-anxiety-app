<template>
  <v-container>
    <h1>Health</h1>
    <weight-chart :labels="labels" :data="weightData" class="mb-8"/>
    <v-row>
      <v-col class="d-flex flex-wrap flex-column justify-start mt-4" >
        <v-date-input v-model="entryDate" label="Date" variant="outlined" hide-details />
        <v-text-field v-model="weight" label="Weight" variant="outlined"  type="number" suffix="kg" prepend-icon="mdi-weight-kilogram" class="mt-8" hide-details />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn color="primary" block @click="addWeight">Add weight entry</v-btn>
    </v-col>
    </v-row>
    <v-row>
      <v-col>
        <h2>Medicine</h2>
        <v-btn color="primary" block @click="addMedicine">Add medicine</v-btn>
      </v-col>
    </v-row>
    <dog-medicine-dialog :id="medicineId" />
  </v-container>
</template>


<script setup lang="ts">
import { Ref, ref, onMounted} from "vue"
import WeightChart from "@/components/WeightChart.vue"
import { useUiStore } from "@/stores/UiStore";
import { useDogStore } from "@/stores/DogStore";
import usePetIdentity from "@/composables/DogIdentity";
import useHealth from "@/composables/DogHealth";
import DogMedicineDialog from '@/components/DogMedicineDialog.vue';

const weight = ref(0)
const entryDate = ref(new Date())

const uiStore = useUiStore();
const dogStore = useDogStore();
const { getPet } = usePetIdentity();
const { getWeightEntries, addWeightEntry } = useHealth();
const labels: Ref<string[]> = ref([]);
const weightData: Ref<number[]> = ref([]);

const medicineId = ref('');

onMounted(async () => {
  let petId = dogStore.pet.id;
  if (!petId || petId === '') {
    const pet = await getPet();

    if (pet) {
      petId = pet.id;
    }
  }

  getEntries(petId);
})

async function getEntries(petId: string) {
  // Get weight entries
  const data = await getWeightEntries(petId);
  const newLabels: string[] = [];
  const weightEntryData: number[] = [];

  data?.forEach((entry: any) => {
    // add the weight entry to the chart data
    newLabels.push(new Date(entry.created_at).toLocaleDateString());
    weightEntryData.push(entry.weight);
  });

  labels.value = newLabels;
  weightData.value = weightEntryData;
}

async function addWeight() {
  // Add weight entry
  let petId = dogStore.pet.id;
  if (!petId || petId === '') {
    const pet = await getPet();

    if (pet) {
      petId = pet.id;
    }
  }

  // TODO handle errors wrap this in try catch
  const call = await addWeightEntry({petId, weight: weight.value, createdAt: entryDate.value.toISOString()});
} 

function addMedicine() {
  // title.value = '';
  // content.value = '';
  // noteId.value = uuidv4();
  uiStore.setShowMedicineDialog(true);
}

// async function addMedicineEntry() {
//   // Add weight entry
//   let petId = dogStore.pet.id;
//   if (!petId || petId === '') {
//     const pet = await getPet();

//     if (pet) {
//       petId = pet.id;
//     }
//   }

//   // TODO handle errors wrap this in try catch
//   const call = await addMedicineEntry({petId, medicineName: weight.value, createdAt: entryDate.value.toISOString()});
// } 
</script>